import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens.util.js";

const REFRESH_DAYS = 7;
const GRACE_WINDOW_MS = 30 * 1000; // 30 seconds
const ACCESS_TOKEN_MINUTES = 15;

export const refresh = async (req, res) => {
  const incoming = req.cookies.refreshToken;
  if (!incoming) return res.status(401).json({ message: "No refresh token" });

  try {
    let decoded;
    try {
      decoded = jwt.verify(incoming, process.env.REFRESH_JWT_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { id: userId, sid: sessionId } = decoded;
    const now = new Date();

    // Find user matching EITHER current OR previous token (within grace period)
    const user = await User.findOne({
      _id: userId,
      "sessions._id": sessionId,
      "sessions.sessionExpiresAt": { $gt: now },
      "sessions.refreshTokenExpiresAt": { $gt: now },
      $or: [
        { "sessions.refreshToken": incoming },
        {
          "sessions.previousRefreshToken": incoming,
          "sessions.refreshTokenRotatedAt": {
            $gt: new Date(now.getTime() - GRACE_WINDOW_MS),
          },
        },
      ],
    });

    if (!user) {
      // If token valid but session not found/expired/reused -> FORCE LOGOUT
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
      return res.status(401).json({ message: "Invalid session" });
    }

    const session = user.sessions.id(sessionId);
    let newRefreshToken;
    let newAccessToken;

    // === SCENARIO 1: Grace Period (Lagging Tab) ===
    // Incoming token matches 'previous'. It's old but valid inside the window.
    // ACTION: Return the CURRENT valid token. DO NOT ROTATE AGAIN.
    if (session.previousRefreshToken === incoming) {
      newRefreshToken = session.refreshToken;
      newAccessToken = generateAccessToken({
        userId,
        role: session.role,
        sessionId,
      });
    }

    // === SCENARIO 2: Normal Rotation ===
    // Incoming token matches 'current'.
    // ACTION: Rotate! Move current to previous, generate new current.
    else if (session.refreshToken === incoming) {
      newRefreshToken = generateRefreshToken({ userId, sessionId });

      session.previousRefreshToken = incoming;
      session.refreshToken = newRefreshToken;
      session.refreshTokenRotatedAt = now;
      session.refreshTokenExpiresAt = new Date(now.getTime() + REFRESH_DAYS * 86400000);
      session.lastUsedAt = now;

      await user.save();

      newAccessToken = generateAccessToken({
        userId,
        role: session.role,
        sessionId,
      });
    }

    // Tells browsers not to store this response i.e. cache control
    res.setHeader("Cache-Control", "no-store");

    // Set Cookies
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: ACCESS_TOKEN_MINUTES * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_DAYS * 86400000,
    });

    return res.json({ success: true });
  } catch(err) {
    console.error("Refresh Logic Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during refresh"
    });
  }
};