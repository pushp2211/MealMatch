import jwt from 'jsonwebtoken';


const ACCESS_SECRET = process.env.JWT_SECRET || "ACCESS_SECRET_KEY";
const REFRESH_SECRET = process.env.JWT_SECRET|| "REFRESH_SECRET_KEY";

// Access token (short-lived)
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, ACCESS_SECRET, { expiresIn: '15m' });
};

// Refresh token (long-lived)
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, REFRESH_SECRET, { expiresIn: '7d' });
};
