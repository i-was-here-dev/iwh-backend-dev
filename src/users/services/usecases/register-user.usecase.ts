import { User } from 'src/users/entities/user.entity';
import { UseCase } from 'src/common/usecase.common';

export type RegisterUserPort = {
  email: string;
  username: string;
  password: string;
};

export interface RegisterUserUseCase extends UseCase<RegisterUserPort, User> {}
