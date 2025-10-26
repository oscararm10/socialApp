import bcrypt from "bcryptjs";
import { AppDataSource } from "./setupDataSource";
import { User } from "./entities/User";
import { Post } from "./entities/Post";

export default async function seed() {
  const userRepo = AppDataSource.getRepository(User);
  const postRepo = AppDataSource.getRepository(Post);

  const existing = await userRepo.count();
  if (existing > 0) {
    console.log("Seed skipped: users already exist");
    return;
  }

  const demoUsers = [
    { name: "Alice", email: "alice@example.com", password: "password1" },
    { name: "Bob", email: "bob@example.com", password: "password2" },
    { name: "Carlos", email: "carlos@example.com", password: "password3" }
  ];

  for (const u of demoUsers) {
    const hashed = await bcrypt.hash(u.password, 10);
    const user = userRepo.create({ name: u.name, email: u.email, password: hashed });
    await userRepo.save(user);

    const post = postRepo.create({
      content: `Hola, soy ${u.name}. Esta es mi publicación inicial.`,
      author: user
    });
    await postRepo.save(post);
    console.log(`Seed: created user ${u.email}`);
  }
}
