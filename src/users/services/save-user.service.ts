import { ConflictException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { SaveUserPort, SaveUserServiceResponse, SaveUserUseCase } from './usecases/save-user.usecase';
import * as bcrypt from 'bcrypt';
import { UserProfileRepositoryInterface } from '../repositories/user-profile-repository.interface';

export class SaveUserService implements SaveUserUseCase {
  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly userProfileRepository: UserProfileRepositoryInterface,
  ) {}

  async execute(payload: SaveUserPort): Promise<SaveUserServiceResponse> {
    const { email, username, password, nickname, profilePictureName } = payload;

    if (await this.userRepository.findByEmail(email)) {
      throw new ConflictException('Email already exists');
    }

    if (await this.userRepository.findByUsername(username)) {
      throw new ConflictException('Username already exists');
    }

    const user: User = await this.saveUser(email, username, password);
    const profile: UserProfile = await this.saveUserProfile(nickname, profilePictureName, user);

    return { user, profile };
  }

  private async saveUser(email: string, username: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = await this.hashPassword(password);

    return await this.userRepository.save(user);
  }

  private async saveUserProfile(nickname: string, profilePictureName: string, user: User): Promise<UserProfile> {
    const profile = new UserProfile();
    profile.nickname = nickname;
    profile.profilePictureName = profilePictureName;
    profile.user = user;

    return await this.userProfileRepository.save(profile);
  }

  private async hashPassword(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 10);
    return hash;
  }
}
