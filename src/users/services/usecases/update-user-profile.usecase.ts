import { UseCase } from 'src/common/usecase.common';
import { UserProfile } from 'src/users/entities/user-profile.entity';

export type UpdateUserProfilePort = {
  userId: number;
  nickname: string;
  profilePictureName: string;
};

export interface UpdateProfileUseCase extends UseCase<UpdateUserProfilePort, UserProfile> {}
