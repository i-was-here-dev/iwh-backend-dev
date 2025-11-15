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
import { Profile } from 'src/users/entities/user.profile.entity';
import { Comment } from './comment.entity';

type PostData = {
  title: string;
  body: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  profile: Profile;
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

  @ManyToOne(() => Profile, (profile) => profile.post)
  @JoinColumn()
  @Index('idx_posts_profile_id')
  profile: Profile;

  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

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
    post.imageUrl = postData.imageUrl || null;
    post.profile = postData.profile;
    return post;
  }
}
