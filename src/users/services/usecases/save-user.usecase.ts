import { User } from 'src/users/entities/user.entity';
import { UseCase } from 'src/common/usecase.common';

export type SaveUserPort = {
  email: string;
  username: string;
  password: string;
};

export interface SaveUserUseCase extends UseCase<SaveUserPort, User> {}
