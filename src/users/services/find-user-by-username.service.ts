import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import {
  FindUserByUsernamePort,
  FindUserByUsernameUseCase,
} from './usecases/find-user-by-username.usecase';

export class FindUserByUsernameService implements FindUserByUsernameUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload?: FindUserByUsernamePort): Promise<User> {
    const { username } = payload;

    const user: User = await this.userRepository.findByUsername(username);

    return user;
  }
}
