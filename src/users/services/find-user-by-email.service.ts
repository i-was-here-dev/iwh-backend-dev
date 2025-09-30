import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UserRepositoryInterface } from 'src/users/repositories/user-repository.interface';
import {
  FindUserByEmailPort,
  FindUserByEmailUseCase,
} from 'src/users/services/usecases/find-user-by-email.usecase';

export class FindUserByEmailService implements FindUserByEmailUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: FindUserByEmailPort): Promise<User> {
    const { email } = payload;

    const user: User | null = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException();

    return user;
  }
}
