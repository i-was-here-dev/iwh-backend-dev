import { NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/user.profile.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { FindProfileByUuidUseCase, FindProfileByUuidPort } from './usecases/find-profile-by-uuid.usecase';

export class FindProfileByUuidService implements FindProfileByUuidUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: FindProfileByUuidPort): Promise<Profile> {
    const { uuid } = payload;

    const user: User | null = await this.userRepository.findByUuid(uuid);
    if (!user) throw new NotFoundException();

    return user.profile;
  }
}
