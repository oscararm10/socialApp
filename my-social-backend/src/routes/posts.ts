import { Router } from "express";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { AppDataSource } from "../setupDataSource";
import { authMiddleware, AuthRequest } from "../middleware/auth";

const router = Router();
const postRepo = () => AppDataSource.getRepository(Post);
const userRepo = () => AppDataSource.getRepository(User);

// List posts
router.get("/", async (req, res) => {
  const posts = await postRepo().find({ order: { id: "DESC" } });
  return res.json(posts);
});

// Create post (protected)
router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "content is required" });

  const user = await userRepo().findOne({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const newPost = postRepo().create({ content, author: user });
  await postRepo().save(newPost);
  return res.status(201).json(newPost);
});

// Like a post
router.post("/:id/like", authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const post = await postRepo().findOne({ where: { id } });
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.likes += 1;
  await postRepo().save(post);
  return res.json({ message: "Liked", likes: post.likes });
});

export default router;
