import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Post, (post) => post.profile)
  post: Post[];

  @Column({ unique: true })
  nickname: string;

  @Column({ name: 'imageURL' })
  profileImageUrl: string;

  @Column()
  points: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
