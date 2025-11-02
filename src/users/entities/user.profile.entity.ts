import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nickname: string;

  @Column({ name: 'imageURL' })
  profileImageUrl: string;

  @Column()
  points: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
