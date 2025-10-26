import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  content!: string;

  @Column({ default: 0 })
  likes!: number;

  @ManyToOne(() => User, user => user.posts, { eager: true })
  author!: User;
}
