import { Router } from "express";
import { AppDataSource } from "../setupDataSource";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/login", async (req, res) => {
  const email = String(req.query.email || "");
  const password = String(req.query.password || "");

  if (!email || !password) return res.status(400).json({ message: "email and password required as query params" });

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "supersecret_jwt_key", { expiresIn: "7d" });
  return res.json({ token });
});

export default router;
