import { Controller, Inject, Post, Body, Get, Param } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UsersDiTokens } from '../di/users-tokens.di';
import { RegisterUserUseCase } from '../services/usecases/register-user.usecase';
import { RegisterUserResponseDto } from '../dto/register-user-response.dto';
import { RegisterUserRequestDto } from '../dto/register-user-request.dto';
import { FindUserByUuidPort, FindUserByUuidUseCase } from '../services/usecases/find-user-by-uuid.usecase';
import { FindUserByUuidResponseDto } from '../dto/find-user-by-uuid-response.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsersDiTokens.RegisterUserService)
    private readonly registerUserService: RegisterUserUseCase,
    @Inject(UsersDiTokens.FindUserByUuidService)
    private readonly findUserByUuidService: FindUserByUuidUseCase,
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

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string): Promise<FindUserByUuidResponseDto> {
    const payload: FindUserByUuidPort = { uuid };
    const user: User | null = await this.findUserByUuidService.execute(payload);

    if (!user) throw new NotFoundException();

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
