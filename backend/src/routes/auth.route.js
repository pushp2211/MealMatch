import { Router } from "express";
const router = Router();

import {
  sendSignupOtp,
  resendSignupOtp,
  signup,
  login,
  logout,
  getMe,
} from "../controllers/index.js";

import { validate } from "../middlewares/validate.middleware.js";
import {
  sendSignupOtpSchema,
  resendOtpSchema,
  signupSchema,
} from "../validators/index.js";

import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";

// SIGNUP FLOW
router.post(
  "/signup/send-otp",
  validate(sendSignupOtpSchema),
  sendSignupOtp
);

router.post(
  "/signup/resend-otp",
  validate(resendOtpSchema),
  resendSignupOtp
);

router.post(
  "/signup",
  validate(signupSchema),
  signup
);

// LOGIN / LOGOUT
router.post("/login", login);
router.post("/logout", logout);

// GET CURRENT USER
router.get("/getme", verifyJwt, getMe);

export default router;
