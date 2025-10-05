import { UseCase } from 'src/common/usecase.common';
import { User } from 'src/users/entities/user.entity';

export type FindUserByIdPort = {
  id: number;
};

export interface FindUserByIdUseCase extends UseCase<FindUserByIdPort, User> {}
