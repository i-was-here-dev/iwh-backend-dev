import { NotFoundException } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../repositories/user-profile-repository.interface';
import { FindProfileByUuidUseCase, FindProfileByUuidPort } from './usecases/find-profile-by-uuid.usecase';

export class FindProfileByUuidService implements FindProfileByUuidUseCase {
  constructor(private readonly userProfileRepository: UserProfileRepositoryInterface) {}

  async execute(payload: FindProfileByUuidPort): Promise<UserProfile> {
    const { uuid } = payload;

    const profile: UserProfile | null = await this.userProfileRepository.findByUuid(uuid);
    if (!profile) throw new NotFoundException();

    return profile;
  }
}
