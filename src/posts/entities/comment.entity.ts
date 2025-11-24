import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/users/entities/user.entity';

type CommentData = {
  userId: number;
  postUuid: string;
  body: string;
};

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  @Index()
  userId: number;

  @Column()
  @Index()
  postUuid: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
