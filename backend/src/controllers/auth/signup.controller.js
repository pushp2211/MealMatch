import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { requestOTP, verifyOTP } from "../../utils/otp.util.js";

// STEP 1: Send OTP (first signup)
export async function sendSignupOtp(req, res) {
  try {
    const signupData = req.body;

    const existingUser = await User.findOne({ email: signupData.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    await requestOTP(signupData.email, signupData);
    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}

// STEP 1b: Resend OTP
export async function resendSignupOtp(req, res) {
  try {
    const { email } = req.body;
    await requestOTP(email, null);
    return res.json({ success: true, message: "OTP resent successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

// STEP 2: Verify OTP & create user
export async function signup(req, res) {
  try {
    const { email, otp } = req.body;

    const otpResult = verifyOTP(email, otp);
    if (!otpResult.success) {
      return res.status(400).json({ error: otpResult.message });
    }

    const signupData = otpResult.data;

    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    const user = new User({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone,
      password: hashedPassword,
      role: signupData.role,
      isVerified: true,
    });

    await user.save();

    return res.status(201).json({ success: true, message: "Signup successful" });
  } catch (err) {
    return res.status(500).json({ error: "Signup failed" });
  }
}
