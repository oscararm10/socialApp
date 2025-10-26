import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Authorization header missing" });

  const parts = header.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Invalid authorization header" });
  const token = parts[1];

  try {
    const secret = process.env.JWT_SECRET || "supersecret_jwt_key";
    const payload = jwt.verify(token, secret) as any;
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
