import { UserProfile } from 'src/users/entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../user-profile-repository.interface';
import { Repository } from 'typeorm';

export class UserProfileRepository implements UserProfileRepositoryInterface {
  constructor(private readonly repository: Repository<UserProfile>) {}

  async findByUserId(userId: number): Promise<UserProfile | null> {
    return await this.repository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'user.posts', 'user.comments'],
    });
  }
  async findByUuid(uuid: string): Promise<UserProfile | null> {
    return await this.repository.findOne({
      where: { uuid: uuid },
      relations: ['user', 'user.posts', 'user.comments'],
    });
  }
  async save(profile: UserProfile): Promise<UserProfile> {
    return await this.repository.save(profile);
  }
}
