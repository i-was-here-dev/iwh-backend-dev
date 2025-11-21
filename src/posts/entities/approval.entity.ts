import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.approvals)
  @JoinColumn()
  @Index('idx_approvals_post_id')
  post: Post;

  @Column({ name: 'user_id' })
  @Index('idx_approvals_user_id')
  userId: number;

  @ManyToOne(() => User, (user) => user.approvals)
  @JoinColumn()
  user: User;
}
