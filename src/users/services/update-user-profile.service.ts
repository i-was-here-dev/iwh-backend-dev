import { NotFoundException } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../repositories/user-profile-repository.interface';
import { UpdateProfileUseCase, UpdateUserProfilePort } from './usecases/update-user-profile.usecase';

export class UpdateProfileService implements UpdateProfileUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepositoryInterface) {}

  async execute(payload: UpdateUserProfilePort): Promise<UserProfile> {
    const { userId, nickname, profilePictureName } = payload;

    const profile: UserProfile | null = await this.userProfileRepository.findByUserId(userId);
    if (!profile) throw new NotFoundException();

    profile.nickname = nickname;
    profile.profilePictureName = profilePictureName;

    return await this.userProfileRepository.save(profile);
  }
}
