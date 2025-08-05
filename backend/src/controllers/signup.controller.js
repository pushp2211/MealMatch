import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { requestOTP, verifyOTP } from '../utils/opt.util.js';

// STEP 1: Send OTP for email verification
export async function sendSignupOtp(req, res) {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const result = requestOTP(email);
  res.json(result);
}

// STEP 2: Signup with verified email
export async function signup(req, res) {
  const { name, email, mobileNumber, password, confirmPassword, role, otp } = req.body;
  console.log("Sending signup data:", {name, email, mobileNumber, password, confirmPassword, role, otp});

  if (!name || !email || !mobileNumber || !password || !confirmPassword || !role || !otp) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  if (!['Seeker', 'Provider'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ error: 'Mobile number must be 10 digits' });
  }

  // Verify OTP before proceeding
  const otpCheck = verifyOTP(email, otp);
  if (!otpCheck.success) {
    return res.status(400).json({ error: otpCheck.message });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    mobileNumber,
    password: hashedPassword,
    role,
    isVerified: true
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
}
