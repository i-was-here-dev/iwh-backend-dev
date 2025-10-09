import { NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { FindUserByUuidPort, FindUserByUuidUseCase } from './usecases/find-user-by-uuid.usecase';

export class FindUserByUuidService implements FindUserByUuidUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: FindUserByUuidPort): Promise<User> {
    const { uuid } = payload;

    const user: User | null = await this.userRepository.findByUuid(uuid);
    if (!user) throw new NotFoundException();

    return user;
  }
}
