import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import {
  FindUserByUsernamePort,
  FindUserByUsernameUseCase,
} from './usecases/find-user-by-username.usecase';
import { NotFoundException } from '@nestjs/common';

export class FindUserByUsernameService implements FindUserByUsernameUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: FindUserByUsernamePort): Promise<User> {
    const { username } = payload;

    const user: User | null =
      await this.userRepository.findByUsername(username);

    if (!user) throw new NotFoundException();

    return user;
  }
}
