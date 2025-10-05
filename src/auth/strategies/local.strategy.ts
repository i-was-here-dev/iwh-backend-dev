import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ValidateUserUseCase } from '../services/usecases/validate-user.usecase';
import { User } from 'src/users/entities/user.entity';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateUserService: ValidateUserUseCase) {
    super();
  }

  async validate(indentifier: string, password: string): Promise<User> {
    return await this.validateUserService.execute({
      identifier: indentifier,
      password: password,
    });
  }
}
