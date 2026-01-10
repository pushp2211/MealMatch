import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_JWT_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_JWT_TOKEN_SECRET;

export const generateAccessToken = ({ userId, role, sessionId }) =>
  jwt.sign(
    { id: userId, role, sid: sessionId },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

export const generateRefreshToken = ({ userId, sessionId }) =>
  jwt.sign(
    { id: userId, sid: sessionId },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
