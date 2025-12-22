import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokens.util.js";

const REFRESH_DAYS = 7;

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_TOKEN_SECRET);

    const user = await User.findOne({
      "sessions.refreshToken": refreshToken,
    });

    if (!user) return res.status(401).json({ message: "Invalid session" });

    const session = user.sessions.find(
      (s) => s.refreshToken === refreshToken
    );

    // if (new Date() > session.sessionExpiresAt) {
    if (
      new Date() > session.sessionExpiresAt ||
      new Date() > session.refreshTokenExpiresAt
    ) {
      user.sessions.pull(session._id);
      await user.save();
      return res.status(401).json({ message: "Session expired" });
    }

    // OPTIONAL BUT RECOMMENDED: rotate refresh token
    const newRefreshToken = generateRefreshToken(user._id);
    session.refreshToken = newRefreshToken;
    session.refreshTokenExpiresAt = new Date(
      Date.now() + REFRESH_DAYS * 86400000
    );

    await user.save();

    const newAccessToken = generateAccessToken({
      userId: user._id,
      role: session.role,
      sessionId: session._id,
    });

    // Tells browsers not to store this response i.e. cache control
    res.setHeader("Cache-Control", "no-store");

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: REFRESH_DAYS * 86400000,
    });

    res.json({ success: true });
  } catch (err) {
    return res.status(401).json({ message: "Refresh failed" });
  }
};
