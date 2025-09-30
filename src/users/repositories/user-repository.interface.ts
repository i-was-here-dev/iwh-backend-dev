import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByUuid(uuid: string): Promise<User | null>;
  save(user: User): Promise<User>;
  softDelete(user: User): Promise<boolean>;
}
