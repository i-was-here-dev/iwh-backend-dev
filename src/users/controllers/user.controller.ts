import { Controller, Inject, Get, Param } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersDiTokens } from '../di/users-tokens.di';
import { FindUserByUuidPort, FindUserByUuidUseCase } from '../services/usecases/find-user-by-uuid.usecase';
import { FindUserByUuidResponseDto } from '../dto/find-user-by-uuid-response.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsersDiTokens.FindUserByUuidService)
    private readonly findUserByUuidService: FindUserByUuidUseCase,
  ) {}

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string): Promise<FindUserByUuidResponseDto> {
    const payload: FindUserByUuidPort = { uuid };
    const user: User = await this.findUserByUuidService.execute(payload);

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
