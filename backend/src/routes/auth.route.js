import { Router } from "express";
const router = Router();

import {
  sendSignupOtp,
  resendSignupOtp,
  signup,
  login,
  logout,
  logoutAll,
  getMe,
  refresh
} from "../controllers/index.js";

import {
  sendSignupOtpSchema,
  resendOtpSchema,
  signupSchema,
} from "../validators/index.js";

import { validate } from "../middlewares/validate.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

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
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/logout-all", protect, logoutAll);

// GET CURRENT USER
router.get("/getme", protect, getMe);

export default router;
