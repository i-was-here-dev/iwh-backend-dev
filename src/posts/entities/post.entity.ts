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
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  @Index('IDX_UUID')
  uuid: string;

  @ManyToOne(() => Profile, (profile) => profile.post)
  @JoinColumn()
  profile: Profile;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'body', type: 'text' })
  body: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column({ name: 'x', type: 'float' })
  x: number;

  @Column({ name: 'y', type: 'float' })
  y: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
