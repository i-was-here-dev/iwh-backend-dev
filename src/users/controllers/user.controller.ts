import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDiTokens } from '../di/user-tokens.di';
import { RegisterUserService } from '../services/register-user.service';
import { RegisterUserPort } from '../services/usecases/register-user.usecase';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserDiTokens.RegisterUserService)
    private readonly registerUserService: RegisterUserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() payload: RegisterUserPort) {
    const user = await this.registerUserService.execute(payload);
    return { message: 'User registered successfully!', user };
  }
}
