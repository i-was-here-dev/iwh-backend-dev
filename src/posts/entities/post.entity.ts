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

type PostData = {
  title: string;
  body: string;
  latitude: number;
  longitude: number;
  imageName?: string;
  user: User;
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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  @Index('idx_posts_user_id')
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

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

  static create(postData: PostData): Post {
    const post = new Post();
    post.title = postData.title;
    post.body = postData.body;
    post.latitude = postData.latitude;
    post.longitude = postData.longitude;
    post.imageName = postData.imageName || null;
    post.user = postData.user;
    return post;
  }
}
