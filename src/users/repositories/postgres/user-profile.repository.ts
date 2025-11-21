import { UserProfile } from 'src/users/entities/user-profile.entity';
import { UserProfileRepositoryInterface } from '../user-profile-repository.interface';
import { Repository } from 'typeorm';

export class UserProfileRepository implements UserProfileRepositoryInterface {
  constructor(private readonly repository: Repository<UserProfile>) {}

  async findByUserId(id: number): Promise<UserProfile | null> {
    return await this.repository.findOne({
      where: { id: id },
    });
  }
  async findByUuid(uuid: string): Promise<UserProfile | null> {
    return await this.repository.findOne({
      where: { uuid: uuid },
    });
  }
  async save(profile: UserProfile): Promise<UserProfile> {
    return await this.repository.save(profile);
  }
}
