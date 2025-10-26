import { DataSource } from "typeorm";
import { User } from "./src/entities/User";
import { Post } from "./src/entities/Post";
import dotenv from "dotenv";
dotenv.config();

export default new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || "postgres",
  password: process.env.DATABASE_PASSWORD || "1234567890",
  database: process.env.DATABASE_NAME || "my_social_db",
  synchronize: true,
  logging: false,
  entities: [User, Post]
});
