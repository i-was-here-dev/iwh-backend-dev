import { Controller, Inject, Post, Body } from '@nestjs/common';
import { UsersDiTokens } from '../di/users-tokens.di';
import { RegisterUserUseCase } from '../services/usecases/register-user.usecase';
import { RegisterUserResponseDto } from '../dto/register-user-response.dto';
import { User } from '../entities/user.entity';
import { RegisterUserRequestDto } from '../dto/register-user-request.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsersDiTokens.RegisterUserService)
    private readonly registerUserService: RegisterUserUseCase,
  ) {}

  @Post()
  async register(@Body() dto: RegisterUserRequestDto): Promise<RegisterUserResponseDto> {
    const payload = {
      email: dto.email.toLowerCase(),
      username: dto.username.trim(),
      password: dto.password,
    };

    const user: User = await this.registerUserService.execute(payload);

    return {
      uuid: user.uuid,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
