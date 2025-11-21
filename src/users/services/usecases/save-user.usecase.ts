import { User } from 'src/users/entities/user.entity';
import { UseCase } from 'src/common/usecase.common';
import { UserProfile } from 'src/users/entities/user-profile.entity';

export type SaveUserServiceResponse = {
  user: User;
  profile: UserProfile;
};

export type SaveUserPort = {
  email: string;
  username: string;
  password: string;
  nickname: string;
  profilePictureName?: string;
};

export interface SaveUserUseCase extends UseCase<SaveUserPort, SaveUserServiceResponse> {}
