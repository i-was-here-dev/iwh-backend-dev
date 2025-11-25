import { Controller, Inject, Delete, HttpCode } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersDiTokens } from '../di/users-tokens.di';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { SoftDeleteUserUsecase } from '../services/usecases/soft-delete-user.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsersDiTokens.SoftDeleteUserService)
    private readonly softDeleteUserService: SoftDeleteUserUsecase,
  ) {}

  @HttpCode(204)
  @Delete('')
  async softDeleteUser(@UserData() user: JwtAuthGuardResponse): Promise<void> {
    await this.softDeleteUserService.execute({
      id: user.id,
    });
  }
}
