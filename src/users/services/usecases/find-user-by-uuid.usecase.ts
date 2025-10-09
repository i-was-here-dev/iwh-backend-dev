import { UseCase } from 'src/common/usecase.common';
import { User } from 'src/users/entities/user.entity';

export type FindUserByUuidPort = {
  uuid: string;
};

export interface FindUserByUuidUseCase extends UseCase<FindUserByUuidPort, User> {}
