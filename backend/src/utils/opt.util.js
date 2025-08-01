import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
function generateOTP(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

// Send OTP via email
async function sendOTP(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP for Signup Verification',
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}: ${otp}`);
  } catch (err) {
    console.error('❌ Error sending OTP email:', err.message);
  }
}

// Store OTP temporarily
function storeOTP(identifier, otp, ttlMs = 5 * 60 * 1000) {
  otpStore.set(identifier, {
    otp,
    expiresAt: Date.now() + ttlMs,
  });
}

// Public function: request OTP
export async function requestOTP(identifier) {
  const otp = generateOTP();
  storeOTP(identifier, otp);
  await sendOTP(identifier, otp); // async send
  return { success: true, message: 'OTP sent to your email' };
}

// Public function: verify OTP
export function verifyOTP(identifier, enteredOtp) {
  const record = otpStore.get(identifier);
  if (!record) return { success: false, message: 'OTP not found or expired' };

  const { otp, expiresAt } = record;

  if (Date.now() > expiresAt) {
    otpStore.delete(identifier);
    return { success: false, message: 'OTP expired' };
  }

  if (otp !== enteredOtp) return { success: false, message: 'Invalid OTP' };

  otpStore.delete(identifier);
  return { success: true, message: 'OTP verified' };
}
