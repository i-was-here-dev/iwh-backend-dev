import { ConflictException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { SaveUserPort, SaveUserUseCase } from './usecases/save-user.usecase';
import * as bcrypt from 'bcrypt';

export class SaveUserService implements SaveUserUseCase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: SaveUserPort): Promise<User> {
    const { email, username, password } = payload;

    if (await this.userRepository.findByEmail(email)) {
      throw new ConflictException('email already exists');
    }

    if (await this.userRepository.findByUsername(username)) {
      throw new ConflictException('username already exists');
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = await this.hashPassword(password);

    return await this.userRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const hash: string = await bcrypt.hash(password, 10);
    return hash;
  }
}
