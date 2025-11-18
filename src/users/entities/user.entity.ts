import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
