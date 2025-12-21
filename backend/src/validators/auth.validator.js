import { z } from "zod";

// STEP 1: Send OTP (first signup)
export const sendSignupOtpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().transform(e => e.toLowerCase()),
  phone: z.string().regex(/^\d{10}$/),
  password: z.string().min(6),
  role: z.enum(["provider", "seeker"]),
});

// STEP 1b: Resend OTP
export const resendOtpSchema = z.object({
  email: z.string().email().transform(e => e.toLowerCase()),
});

// STEP 2: Verify OTP
export const signupSchema = z.object({
  email: z.string().email().transform(e => e.toLowerCase()),
  otp: z.string().length(6),
});
