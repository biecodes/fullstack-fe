import jwt from "jsonwebtoken";

const JWT_SECRET: any = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("Please define JWT_SECRET in env");

export function signToken(payload: any, options: { expiresIn?: any | number } = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: options.expiresIn || "7d" });
}

export function verifyToken(token: any) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}
