import { UseCase } from 'src/common/usecase.common';
import { Profile } from 'src/users/entities/user.profile.entity';

export type FindProfileByUuidPort = {
  uuid: string;
};

export interface FindProfileByUuidUseCase extends UseCase<FindProfileByUuidPort, Profile> {}
