import { User } from '../../models/user.models.js';
import twilio from 'twilio';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const accountSid = process.env.TWILLIOSID;
const authToken = process.env.TWILLIOAUTHTOKEN;
const client = twilio(accountSid, authToken);

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
};

export const genrateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.genrateAccessToken();

        await user.save({ validateBeforeSave: false });
        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong in generating tokens");
    }
};

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(new ApiError(400, 'Enter a valid email address'));
    }

    if (!isStrongPassword(password)) {
        return next(new ApiError(400, 'Password should be strong with minimum 8 characters, special character, and number'));
    }

    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
        if (user.isVerified) {
            return next(new ApiError(400, 'Email or phone number already exists and is verified'));
        } else {
            user.fullName = fullName;
            user.email = email;
            user.phone = phone;
            user.password = password;
            user.otp = generateOTP();
            user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
            user.lastOtpSentTime = new Date();
        }
    } else {
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        user = new User({
            fullName,
            email,
            phone,
            password,
            otp,
            otpExpires,
            lastOtpSentTime: new Date()
        });
    }

    await user.save();

    try {
        await client.messages.create({
            body: `Your verification code is ${user.otp}`,
            to: phone,
            from: process.env.TWILLIOPHONENUMBER
        });
    } catch (error) {
        if (error.status === 400 && error.code === 21211) {
            return next(new ApiError(400, `Invalid phone number: ${phone}`));
        } else {
            return next(new ApiError(500, 'Failed to send OTP. Please try again later.'));
        }
    }

    res.status(201).json(new ApiResponse(201, 'User registered successfully. Please verify your phone number.', { userId: user._id }));
});

const verifyOTP = asyncHandler(async (req, res, next) => {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
        return next(new ApiError(400, 'Invalid or expired OTP'));
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json(new ApiResponse(200, 'Phone number verified successfully'));
});

const login = asyncHandler(async (req, res, next) => {
    const { email, phone, password } = req.body;
    if ((!email && !phone) || !password) {
        return next(new ApiError(400, 'Email/Phone and password must be provided'));
    }
    const user = await User.findOne({
        $or: [{ email }, { phone }]
    });

    if (!user) {
        return next(new ApiError(400, 'Invalid credentials'));
    }
    const isPasswordValid = user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return next(new ApiError(400, 'Invalid Password'));
    }
    if (!user.isVerified) {
        return next(new ApiError(400, 'Please verify your phone number'));
    }

    const accessToken = await genrateAccessTokenAndRefreshToken(user._id);
    const loggedInuser = await User.findById(user._id).select("-password");
    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInuser, accessToken
                },
                "User logged in successfully"
            )
        );
});

const resendOTP = asyncHandler(async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ApiError(404, 'User not found'));
    }

    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

    if (user.lastOtpSentTime && user.lastOtpSentTime > oneMinuteAgo) {
        return next(new ApiError(400, 'OTP can only be resent after 1 minute'));
    }

    user.otp = generateOTP();
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.lastOtpSentTime = now;

    await user.save();

    try {
        await client.messages.create({
            body: `Your verification code is ${user.otp}`,
            to: user.phone,
            from: process.env.TWILLIOPHONENUMBER
        });
    } catch (error) {
        if (error.status === 400 && error.code === 21211) {
            return next(new ApiError(400, `Invalid phone number: ${user.phone}`));
        } else {
            return next(new ApiError(500, 'Failed to send OTP. Please try again later.'));
        }
    }

    res.status(200).json(new ApiResponse(200, 'OTP resent successfully.'));
});

const logout = asyncHandler(async (req, res, next) => {
    // Clear the accessToken cookie
    res.cookie('accessToken', '', {
        expires: new Date(0), 
        httpOnly: true,
        secure:true
    });

    res.status(200).json(new ApiResponse(200, 'Logged out successfully.'));
});

export { registerUser, verifyOTP, login, resendOTP ,logout};
