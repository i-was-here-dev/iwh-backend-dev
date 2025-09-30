import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import {
  RegisterUserPort,
  RegisterUserUseCase,
} from './usecases/register-user.usecase';

export class RegisterUserService implements RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: RegisterUserPort): Promise<User> {
    const { email, username, password } = payload;
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    await this.userRepository.save(user);
    return user;
  }
}
