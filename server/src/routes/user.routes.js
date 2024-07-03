import { Router } from "express";
import { login, logout, registerUser, resendOTP, verifyOTP } from "../controllers/user/user.controller.js";

const router = Router();

router.route("/registeruser").post(registerUser);
router.route('/verify-otp').post(verifyOTP);
router.route('/login').post(login);
router.route('/resend-otp').post(resendOTP);
router.route('/logout').post(logout)

export default router;