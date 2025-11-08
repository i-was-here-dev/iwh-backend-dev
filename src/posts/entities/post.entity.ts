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
import { Profile } from 'src/users/entities/user.profile.entity';

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

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'image_url' })
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
}
