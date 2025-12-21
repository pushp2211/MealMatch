import bcrypt from 'bcrypt';
import { User } from '../../models/user.model.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../../utils/tokens.util.js';

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.role !== role) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);


    // Set tokens in HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 min
      sameSite: 'Lax',
      secure: false // true in production with HTTPS
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'Lax',
      secure: false
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("accessToken", { httpOnly: true, sameSite: 'Lax', secure: false });
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'Lax', secure: false });

    res.json({ success: true, message: "Logged out successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed", error: err.message });
  }
};

export const getMe = (req, res) => {
  const user = req.user; // From decoded token
  res.json({ user });
};

