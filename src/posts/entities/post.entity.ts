import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Comment } from './comment.entity';
import { Approval } from './approval.entity';

type PostData = {
  title: string;
  body: string;
  latitude: number;
  longitude: number;
  imageName?: string;
  userId: number;
  videoName?: string;
};

@Entity('posts')
@Index(['longitude', 'latitude'])
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Index('idx_posts_uuid')
  uuid: string;

  @Column({ nullable: true })
  @Index()
  userId: number | null;

  @ManyToOne(() => User, (user) => user.posts, { nullable: true })
  @JoinColumn()
  @Index('idx_posts_user_id')
  user: User | null;

  @OneToMany(() => Comment, (comment) => comment.post, { onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Approval, (approval) => approval.post, { onDelete: 'CASCADE' })
  approvals: Approval[];

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'image_name', nullable: true })
  imageName: string;

  @Column({ name: 'video_name', nullable: true })
  videoName: string;

  @Column({ name: 'latitude', type: 'float' })
  latitude: number;

  @Column({ name: 'longitude', type: 'float' })
  longitude: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
