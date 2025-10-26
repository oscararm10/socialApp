import { Router } from "express";
import { AppDataSource } from "../setupDataSource";
import { User } from "../entities/User";

const router = Router();
const userRepo = () => AppDataSource.getRepository(User);

// Get user profile (public)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userRepo().findOne({ where: { id }, relations: ["posts"] });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...safeUser } = user as any;
  return res.json(safeUser);
});

export default router;
