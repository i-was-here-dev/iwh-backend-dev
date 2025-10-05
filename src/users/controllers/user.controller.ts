import { Controller, Inject, Post, Body } from '@nestjs/common';
import { UsersDiTokens } from '../di/users-tokens.di';
import { RegisterUserService } from '../services/register-user.service';
import { RegisterUserPort } from '../services/usecases/register-user.usecase';
import { RegisterUserResponseDto } from '../dto/register-user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UsersDiTokens.RegisterUserService)
    private readonly registerUserService: RegisterUserService,
  ) {}

  @Post()
  async register(
    @Body() payload: RegisterUserPort,
  ): Promise<RegisterUserResponseDto> {
    const user = await this.registerUserService.execute(payload);

    const response = new RegisterUserResponseDto();
    response.username = user.username;
    response.email = user.email;
    response.createdAt = user.createdAt;
    response.updatedAt = user.createdAt;
    return response;
  }
}
