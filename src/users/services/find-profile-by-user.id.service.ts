import { NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/user.profile.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { FindProfileByUserIdUseCase, FindProfileByUserIdPort } from './usecases/find-profile-by-user.id.usecase';

export class FindProfileByUserIdService implements FindProfileByUserIdUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: FindProfileByUserIdPort): Promise<Profile> {
    const { id } = payload;

    const user: User | null = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException();

    return user.profile;
  }
}
