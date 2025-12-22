import bcrypt from 'bcrypt';
import { User } from '../../models/user.model.js';
import {
  generateAccessToken,
  generateRefreshToken
} from '../../utils/tokens.util.js';

const REFRESH_DAYS = 7;
const SESSION_DAYS = 30;

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    const refreshToken = generateRefreshToken(user._id);
    const now = new Date();
    
    // FIX 1: Extract deviceId from headers
    const deviceId = req.headers["x-device-id"] || "unknown";

    // FIX 2: Use now.getTime() for proper date arithmetic
    const session = user.sessions.create({
      refreshToken,
      role,
      deviceId,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      refreshTokenExpiresAt: new Date(now.getTime() + REFRESH_DAYS * 86400000),
      sessionExpiresAt: new Date(now.getTime() + SESSION_DAYS * 86400000),
    });

    user.sessions.push(session);
    await user.save();

    const accessToken = generateAccessToken({
      userId: user._id,
      role,
      sessionId: session._id,
    });

    // Set tokens in HTTP-only cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 min
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production' // true in production
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: REFRESH_DAYS * 86400000, // 7 days
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user._id, role, sessionId: session._id },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({
        "sessions.refreshToken": refreshToken,
      });

      if (user) {
        user.sessions = user.sessions.filter(
          (s) => s.refreshToken !== refreshToken
        );
        await user.save();
      }
    }

    res.clearCookie("accessToken", { 
      httpOnly: true, 
      sameSite: 'Lax', 
      secure: process.env.NODE_ENV === 'production'
    });
    res.clearCookie("refreshToken", { 
      httpOnly: true, 
      sameSite: 'Lax', 
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ success: true, message: "Logged out successfully" });

  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Logout failed", error: err.message });
  }
};

export const logoutAll = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.sessions = [];
    await user.save();

    res.clearCookie("accessToken", { 
      httpOnly: true, 
      sameSite: 'Lax', 
      secure: process.env.NODE_ENV === 'production'
    });
    res.clearCookie("refreshToken", { 
      httpOnly: true, 
      sameSite: 'Lax', 
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ success: true, message: "Logged out from all devices" });
  } catch (err) {
    console.error("Logout all error:", err);
    res.status(500).json({ success: false, message: "Logout all failed", error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    // Return the user info from the decoded token
    res.json({ 
      success: true,
      user: req.user  // Contains: { id, role, sessionId }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};