import { Body, Controller, HttpCode, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { GenerateAuthTokensUseCase } from '../services/usecases/generate-auth-tokens.usecase';
import { AuthDiTokens } from '../di/auth-tokens.di';
import { RegisterRequestDto } from '../dto/register-request.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { SaveUserServiceResponse, SaveUserUseCase } from 'src/users/services/usecases/save-user.usecase';
import { UsersDiTokens } from 'src/users/di/users-tokens.di';
import { User } from 'src/users/entities/user.entity';
import { JwtTokens } from '../types/jwt-tokens.type';
import { LoginResponseDto } from '../dto/login-response.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LocalAuthGuardResponse } from '../interfaces/local-auth-guard-response.interface';
import { Public } from '../metadata/public.metadata';
import { ExtractJwt } from 'passport-jwt';
import { BlacklistTokenUseCase } from '../services/usecases/blacklist-token.usecase';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { UserData } from '../decorators/user-data.decorator';
import { JwtAuthGuardResponse } from '../interfaces/jwt-auth-guard-response.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthDiTokens.GenerateAuthTokensService)
    private readonly generateAuthTokensService: GenerateAuthTokensUseCase,
    @Inject(UsersDiTokens.SaveUserService)
    private readonly saveUserService: SaveUserUseCase,
    @Inject(AuthDiTokens.BlacklistTokenService)
    private readonly blacklistTokenService: BlacklistTokenUseCase,
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    const saveUserServiceResponse: SaveUserServiceResponse = await this.saveUserService.execute({
      username: payload.username,
      email: payload.email,
      password: payload.password,
      nickname: payload.nickname,
      profilePictureName: payload.profilePictureName,
    });
    const tokens: JwtTokens = await this.generateAuthTokensService.execute({
      userId: saveUserServiceResponse.user.id,
      username: saveUserServiceResponse.user.username,
      email: saveUserServiceResponse.user.email,
    });

    return {
      user: {
        uuid: saveUserServiceResponse.user.uuid,
        username: saveUserServiceResponse.user.username,
        email: saveUserServiceResponse.user.email,
        createdAt: saveUserServiceResponse.user.createdAt,
        updatedAt: saveUserServiceResponse.user.updatedAt,
        deletedAt: saveUserServiceResponse.user.deletedAt,
      },
      profile: {
        uuid: saveUserServiceResponse.profile.uuid,
        nickname: saveUserServiceResponse.profile.nickname,
        profilePictureName: saveUserServiceResponse.profile.profilePictureName,
        points: saveUserServiceResponse.profile.points,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/log-in')
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

    await this.blacklistTokenService.execute({ token: jwtToken });
    await this.blacklistTokenService.execute({ token: refreshToken });
  }

  @Public()
  @Post('/refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Request() req: Request, @UserData() user: JwtAuthGuardResponse): Promise<RefreshTokenResponseDto> {
    const refreshTokenExtractor = ExtractJwt.fromExtractors([ExtractJwt.fromHeader('refresh-token')]);
    const refreshToken = refreshTokenExtractor(req);

    await this.blacklistTokenService.execute({ token: refreshToken });

    const tokens: JwtTokens = await this.generateAuthTokensService.execute({
      username: user.username,
      email: user.email,
      userId: user.id,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}
