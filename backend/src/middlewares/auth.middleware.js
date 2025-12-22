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
    console.error("Auth middleware error:", err);
    
    // Handle specific JWT errors
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    return res.status(401).json({ message: "Authentication failed" });
  }
};