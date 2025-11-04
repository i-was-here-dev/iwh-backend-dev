import { Body, Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { GenerateAuthTokensUseCase } from '../services/usecases/generate-auth-tokens.usecase';
import { AuthDiTokens } from '../di/auth-tokens.di';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { SaveUserUseCase } from 'src/users/services/usecases/save-user.usecase';
import { UsersDiTokens } from 'src/users/di/users-tokens.di';
import { User } from 'src/users/entities/user.entity';
import { JwtTokens } from '../types/jwt-tokens.type';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LocalAuthGuardResponse } from '../interfaces/local-auth-guard-response.interface';
import { Public } from '../metadata/public.metadata';
import { ExtractJwt } from 'passport-jwt';
import { BlacklistJwtTokenUseCase } from '../services/usecases/blacklist-jwt-token.usecase';
import { BlacklistRefreshTokenUseCase } from '../services/usecases/blacklist-refresh-token.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthDiTokens.GenerateAuthTokensService)
    private readonly generateAuthTokensService: GenerateAuthTokensUseCase,
    @Inject(UsersDiTokens.SaveUserService)
    private readonly saveUserService: SaveUserUseCase,
    @Inject(AuthDiTokens.BlacklistJwtTokenService)
    private readonly blacklistJwtTokenService: BlacklistJwtTokenUseCase,
    @Inject(AuthDiTokens.BlacklistRefreshTokenService)
    private readonly blacklistRefreshTokenService: BlacklistRefreshTokenUseCase,
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user: User = await this.saveUserService.execute({ username: payload.username, email: payload.email, password: payload.password });
    const tokens: JwtTokens = await this.generateAuthTokensService.execute({ userId: user.id, username: user.username, email: user.email });

    return {
      user: {
        uuid: user.uuid,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: LocalAuthGuardResponse): Promise<LoginResponseDto> {
    const tokens: JwtTokens = await this.generateAuthTokensService.execute({
      username: req.user.username,
      email: req.user.email,
      userId: req.user.id,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Post('/log-out')
  @HttpCode(204)
  async logout(@Request() req: Request): Promise<void> {
    const jwtExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const refreshTokenExtractor = ExtractJwt.fromExtractors([ExtractJwt.fromHeader('refresh-token')]);

    const jwtToken = jwtExtractor(req);
    const refreshToken = refreshTokenExtractor(req);

    await this.blacklistJwtTokenService.execute({ jwtToken: jwtToken });
    await this.blacklistRefreshTokenService.execute({ refreshToken: refreshToken });
  }
}
