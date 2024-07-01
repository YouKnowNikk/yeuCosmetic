import { Router } from "express";
import { login, registerUser, verifyOTP } from "../controllers/user/user.controller.js";

const router = Router();

router.route("/registeruser").post(registerUser);
router.route('/verify-otp').post(verifyOTP);
router.route('/login').post(login);

export default router;