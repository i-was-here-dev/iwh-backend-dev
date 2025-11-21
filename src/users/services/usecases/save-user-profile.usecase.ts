import { UserProfile } from 'src/users/entities/user-profile.entity';
import { UseCase } from 'src/common/usecase.common';

export type SaveUserProfilePort = {
  nickname: string;
  profilePictureName: string;
};

export interface SaveUserProfileUseCase extends UseCase<SaveUserProfilePort, UserProfile> {}
