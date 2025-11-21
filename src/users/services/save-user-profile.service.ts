import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../repositories/user-profile-repository.interface';
import { SaveUserProfileUseCase, SaveUserProfilePort } from './usecases/save-user-profile.usecase';

export class SaveUserProfileService implements SaveUserProfileUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepositoryInterface) {}

  async execute(payload: SaveUserProfilePort): Promise<UserProfile> {
    const { nickname, profilePictureName, userId } = payload;

    const profile = new UserProfile();
    profile.nickname = nickname;
    profile.profilePictureName = profilePictureName;
    profile.userId = userId;

    return await this.userProfileRepository.save(profile);
  }
}
