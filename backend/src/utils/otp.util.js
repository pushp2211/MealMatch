import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// In-memory OTP store (Redis in production)
const otpStore = new Map();

// Stable Gmail SMTP config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
  connectionTimeout: 10_000,
});

// Verify SMTP on startup
transporter.verify((err) => {
  if (err) {
    console.error("SMTP not ready:", err.message);
  } else {
    console.log("SMTP ready");
  }
});

function generateOTP(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: `"MealMatch" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Signup Verification",
    text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
  });
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

  // reuse signupData on resend
  const existing = otpStore.get(email);
  const dataToStore = signupData || existing?.signupData;

  if (!dataToStore) {
    throw new Error("Signup data not found. Please signup again.");
  }

  storeOTP(email, otp, dataToStore);

  try {
    await sendOTP(email, otp);
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
    record.expiresAt = Date.now(); // expire immediately

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


