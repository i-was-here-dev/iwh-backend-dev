import { User } from 'src/users/entities/user.entity';
import { UseCase } from 'src/common/usecase.common';

export type createRegisterUserPort = {
  email: string;
  username: string;
  password: string;
};

export interface createRegisterUserUseCase
  extends UseCase<createRegisterUserPort, User> {}
