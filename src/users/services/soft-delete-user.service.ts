import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  private readonly repository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }
  async softDelete(userId: number): Promise<boolean> {
    const result: UpdateResult = await this.repository.softDelete(userId);
    return result.affected !== undefined && result.affected > 0;
  }
}
