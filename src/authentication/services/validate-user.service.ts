import { FindUserByUsernameUseCase } from 'src/users/services/usecases/find-user-by-username.usecase';
import { FindUserByEmailUseCase } from 'src/users/services/usecases/find-user-by-email.usecase';
import { User } from 'src/users/entities/user.entity';
import {
  ValidateUserPort,
  ValidateUserUseCase,
} from 'src/authentication/services/usecases/validate-user.usecase';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

export class ValidateUserService implements ValidateUserUseCase {
  constructor(
    private readonly FindUserByUsernameService: FindUserByUsernameUseCase,
    private readonly FindUserByEmailService: FindUserByEmailUseCase,
  ) {}

  async execute(payload: ValidateUserPort): Promise<string> {
    let user: User | null = null;
    const { username, email, password } = payload;

    if (username) {
      user = await this.FindUserByUsernameService.execute({
        username: username,
      });
    } else if (email) {
      user = await this.FindUserByEmailService.execute({ email: email });
    } else {
      throw new NotFoundException('Username or email must be provided');
    }

    if (!user) throw new NotFoundException('User not found');

    if (await bcrypt.compare(password, user.password)) {
      const { username } = user;
      return username;
    }

    return null;
  }
}
