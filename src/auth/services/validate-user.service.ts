import { FindUserByUsernameUseCase } from 'src/users/services/usecases/find-user-by-username.usecase';
import { FindUserByEmailUseCase } from 'src/users/services/usecases/find-user-by-email.usecase';
import { User } from 'src/users/entities/user.entity';
import { ValidateUserPort, ValidateUserUseCase } from 'src/auth/services/usecases/validate-user.usecase';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class ValidateUserService implements ValidateUserUseCase {
  constructor(
    private readonly findUserByUsernameService: FindUserByUsernameUseCase,
    private readonly findUserByEmailService: FindUserByEmailUseCase,
  ) {}

  async execute(payload: ValidateUserPort): Promise<User> {
    const { identifier, password } = payload;

    const user: User | null = await this.getUserByIdentifier(identifier);

    if (!user) throw new NotFoundException();

    if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException();

    return user;
  }

  private async getUserByIdentifier(identifier: string): Promise<User | null> {
    if (this.isEmail(identifier)) {
      return await this.findUserByEmailService.execute({ email: identifier });
    }

    return await this.findUserByUsernameService.execute({
      username: identifier,
    });
  }

  private isEmail(identifier: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(identifier);
  }
}
