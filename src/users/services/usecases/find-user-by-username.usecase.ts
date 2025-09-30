import { UseCase } from 'src/common/usecase.common';
import { User } from 'src/users/entities/user.entity';

export type FindUserByUsernamePort = {
  username: string;
};

export interface FindUserByUsernameUseCase
  extends UseCase<FindUserByUsernamePort, User> {}
