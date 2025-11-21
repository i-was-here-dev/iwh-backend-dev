import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  @Index()
  userId: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  @Index('idx_user_profile_user_id')
  user: User;

  @Column()
  nickname: string;

  @Column({ name: 'profile_picture_name', nullable: true })
  profilePictureName: string;

  @Column({ nullable: true })
  points: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
