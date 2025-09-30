import { UseCase } from 'src/common/usecase.common';
import { User } from 'src/users/entities/user.entity';

export type FindUserByEmailPort = {
  email: string;
};

export interface FindUserByEmailUseCase
  extends UseCase<FindUserByEmailPort, User> {}
