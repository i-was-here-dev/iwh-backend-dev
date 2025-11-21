import { UserProfile } from '../entities/user-profile.entity';

export interface UserProfileRepositoryInterface {
  findByUserId(id: number): Promise<UserProfile | null>;
  findByUuid(uuid: string): Promise<UserProfile | null>;
  save(profile: UserProfile): Promise<UserProfile>;
}
