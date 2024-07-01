import {User} from '../../models/user.models.js'
import twilio from 'twilio';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const accountSid = process.env.TWILLIOSID
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
  
      await user.save({ validateBeforeSave: false })
      return accessToken
    } catch (error) {
      throw new ApiError(500, " something wnet wrong in genrating tokens")
    }
  }
const registerUser = asyncHandler(async(req,res,next)=>{
    const { fullName, email, phone, password} = req.body;

    if (!fullName || !email || !phone || !password ) {
        return next(new ApiError(400, 'All required fields must be provided'));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Enter a valid email address");
  }
  if (!isStrongPassword(password)) {
    throw new ApiError(400, "Password should be strong with minimum 8 characters, special character, and number");
  }
  const existingEmail = await User.exists({ email });
    if (existingEmail) {
        return next(new ApiError(400, 'Email already exists'));
    }

    const existingPhone = await User.exists({ phone });
    if (existingPhone) {
        return next(new ApiError(400, 'Phone number already exists'));
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    const user = new User({
        fullName,
        email,
        phone,
        password,
        otp,
        otpExpires
    });
    await user.save();

    client.messages.create({
        body: `Your verification code is ${otp}`,
        to: phone,  
        from: process.env.TWILLIOPHONENUMBER // Replace with your Twilio phone number
    });

    res.status(201).json(new ApiResponse(201, 'User registered successfully. Please verify your phone number.', { userId: user._id }));

})
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

const login = asyncHandler(async(req,res,next)=>{
    const { email, phone, password } = req.body;
    if ((!email && !phone) || !password) {
        return next(new ApiError(400, 'Email/Phone and password must be provided'));
    }
    const user = await User.findOne({
        $or:[{email},{phone}]
    })

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
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInuser, accessToken
            },
            "User logged In Successfully"
        )
    )

})


export { registerUser, verifyOTP ,login};
