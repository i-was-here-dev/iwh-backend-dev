import { NotFoundException } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../repositories/user-profile-repository.interface';
import { FindProfileByUserIdUseCase, FindProfileByUserIdPort } from './usecases/find-profile-by-user.id.usecase';

export class FindProfileByUserIdService implements FindProfileByUserIdUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepositoryInterface) {}

  async execute(payload: FindProfileByUserIdPort): Promise<UserProfile> {
    const { id } = payload;

    const profile: UserProfile | null = await this.userProfileRepository.findByUserId(id);
    if (!profile) throw new NotFoundException();

    return profile;
  }
}
