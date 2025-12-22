// import jwt from 'jsonwebtoken';

// const ACCESS_SECRET = process.env.ACCESS_JWT_TOKEN_SECRET;
// const REFRESH_SECRET = process.env.REFRESH_JWT_TOKEN_SECRET;

// // Access token (short-lived)
// export const generateAccessToken = (user) =>
//   jwt.sign(
//     { id: user._id, role: user.role },
//     ACCESS_SECRET,
//     { expiresIn: "15m" }
//   );

// // Refresh token (long-lived)
// export const generateRefreshToken = (user) =>
//   jwt.sign(
//     { id: user._id },
//     REFRESH_SECRET,
//     { expiresIn: "7d" }
//   );

import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_JWT_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_JWT_TOKEN_SECRET;

export const generateAccessToken = ({ userId, role, sessionId }) =>
  jwt.sign(
    { id: userId, role, sid: sessionId },
    ACCESS_SECRET,
    { expiresIn: "15m" }
  );

export const generateRefreshToken = (userId) =>
  jwt.sign(
    { id: userId },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  );
