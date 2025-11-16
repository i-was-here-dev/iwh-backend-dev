import { UseCase } from 'src/common/usecase.common';
import { Profile } from 'src/users/entities/user.profile.entity';

export type FindProfileByUserIdPort = {
  id: number;
};

export interface FindProfileByUserIdUseCase extends UseCase<FindProfileByUserIdPort, Profile> {}
