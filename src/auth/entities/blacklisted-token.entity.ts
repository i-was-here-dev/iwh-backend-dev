import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('blacklisted_tokens')
export class BlacklistedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('IDX_TOKEN')
  @Column({ name: 'token' })
  token: string;
}
