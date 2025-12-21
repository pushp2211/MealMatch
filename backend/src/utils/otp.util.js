import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import { sendEmail } from "./brevoEmail.util.js";
import { emailTemplates } from "./emailTemplates.util.js";

// In-memory OTP store (Redis in production)
const otpStore = new Map();

function generateOTP(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

function storeOTP(email, otp, signupData, ttlMs = 5 * 60 * 1000) {
  otpStore.set(email, {
    otp,
    signupData,
    expiresAt: Date.now() + ttlMs,
    attempts: 0,
  });
}

// STEP 1: Request / Resend OTP
export async function requestOTP(email, signupData) {
  const otp = generateOTP();
  const ttlMs = 5 * 60 * 1000;

  // reuse signupData on resend
  const existing = otpStore.get(email);
  const dataToStore = signupData || existing?.signupData;

  if (!dataToStore) {
    throw new Error("Signup data not found. Please signup again.");
  }

  storeOTP(email, otp, dataToStore, ttlMs);

  try {
    // await sendOTP(email, otp);
    // return { success: true };
    const { subject, html } = emailTemplates.signupOtp({
      otp,
      validityMinutes: 5,
    });

    await sendEmail({ to: email, subject, html });
    return { success: true };
  } catch (err) {
    otpStore.delete(email);
    throw new Error("Failed to send OTP. Please try again.");
  }
}

// STEP 2: Verify OTP
export function verifyOTP(email, enteredOtp) {
  const record = otpStore.get(email);

  if (!record) {
    return { success: false, message: "OTP expired or not found" };
  }

  const { otp, expiresAt, signupData } = record;

  if (Date.now() > expiresAt) {
    otpStore.delete(email);
    return { success: false, message: "OTP expired" };
  }

  if (record.attempts >= 5) {
    // Invalidate OTP but keep signup data
    record.otp = null;

    return {
      success: false,
      message: "Too many invalid attempts. Please resend OTP.",
    };
  }

  if (otp !== enteredOtp) {
    record.attempts += 1;
    return { success: false, message: "Invalid OTP" };
  }

  otpStore.delete(email);
  return { success: true, data: signupData };
}