import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import {
  createRegisterUserPort,
  createRegisterUserUseCase,
} from './usecases/create-register-user.usecase';

export class createRegisterUserService implements createRegisterUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: createRegisterUserPort): Promise<void> {
    const { email, username, password } = payload;
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    await this.userRepository.save(user);
  }
}
