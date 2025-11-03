import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated()
  uuid: string;

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

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
