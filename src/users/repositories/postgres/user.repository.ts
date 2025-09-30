import { User } from 'src/users/entities/user.entity';
import { UserRepositoryInterface } from '../user-repository.interface';
import { Repository, UpdateResult } from 'typeorm';

export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly repository: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email: email },
    });
  }
  async findById(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }
  async findByUsername(username: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { username: username },
    });
  }
  async findByUuid(uuid: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { uuid: uuid },
    });
  }
  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }
  async softDelete(user: User): Promise<boolean> {
    const result: UpdateResult = await this.repository.softDelete(user.id);

    if (result.affected > 0) return true;
    return false;
  }
}
