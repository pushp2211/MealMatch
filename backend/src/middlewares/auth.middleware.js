import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_JWT_TOKEN_SECRET
    );

    // Validate user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Validate session exists
    const session = user.sessions.id(decoded.sid);
    if (!session) {
      return res.status(401).json({ message: "Session not found" });
    }

    // Check if session expired
    if (new Date() > session.sessionExpiresAt) {
      // Clean up expired session
      user.sessions.pull(session._id);
      await user.save();
      return res.status(401).json({ message: "Session expired" });
    }

    // Check if role matches (important for multi-role users)
    if (session.role !== decoded.role) {
      return res.status(401).json({ message: "Role mismatch" });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      role: decoded.role,
      sessionId: decoded.sid,
    };

    next();
  } catch (err) {
    // IMPORTANT: Access token expiry is NORMAL
    if (err.name === "TokenExpiredError") {
      // Do NOT log as error
      return res.status(401).json({ message: "Access token expired" });
    }
    // Real auth errors
    if (err.name === "JsonWebTokenError") {
      console.warn("Invalid JWT:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error("Auth middleware unexpected error:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};