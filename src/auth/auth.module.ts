import { Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthDiTokens } from './di/auth-tokens.di';
import { GenerateAuthTokensService } from './services/generate-auth-tokens.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { FindUserByEmailUseCase } from 'src/users/services/usecases/find-user-by-email.usecase';
import { FindUserByUsernameUseCase } from 'src/users/services/usecases/find-user-by-username.usecase';
import { ValidateUserService } from './services/validate-user.service';
import { UsersDiTokens } from 'src/users/di/users-tokens.di';
import { PassportModule } from '@nestjs/passport';
import { ValidateUserUseCase } from './services/usecases/validate-user.usecase';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DataSource, Repository } from 'typeorm';
import { BlacklistedToken } from './entities/blacklisted-token.entity';
import { DatabaseDiTokens } from 'src/infrastructure/database/di/database-tokens.di';
import { BlacklistedTokenRepository } from './repositories/postgres/blacklisted-token.repository';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { BlacklistedTokenRepositoryInterface } from './repositories/blacklisted-token-repository.interface';
import { BlacklistTokenService } from './services/blacklist-token.service';

const repositoryProvider: Array<Provider> = [
  {
    provide: AuthDiTokens.PostgresBlacklistedTokenRepositoryInterface,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(BlacklistedToken),
    inject: [DatabaseDiTokens.PostgresDataSource],
  },
  {
    provide: AuthDiTokens.BlacklistedTokenRepositoryInterface,
    useFactory: (repository: Repository<BlacklistedToken>) => new BlacklistedTokenRepository(repository),
    inject: [AuthDiTokens.PostgresBlacklistedTokenRepositoryInterface],
  },
];

const serviceProvider: Array<Provider> = [
  {
    provide: AuthDiTokens.GenerateAuthTokensService,
    useFactory: (jwtService: JwtService) => new GenerateAuthTokensService(jwtService),
    inject: [JwtService],
  },
  {
    provide: AuthDiTokens.ValidateUserService,
    useFactory: (findUserByUsernameService: FindUserByUsernameUseCase, findUserByEmailService: FindUserByEmailUseCase) =>
      new ValidateUserService(findUserByUsernameService, findUserByEmailService),
    inject: [UsersDiTokens.FindUserByUsernameService, UsersDiTokens.FindUserByEmailService],
  },
  {
    provide: AuthDiTokens.BlacklistTokenService,
    useFactory: (blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) => new BlacklistTokenService(blacklistedTokenRepository),
    inject: [AuthDiTokens.BlacklistedTokenRepositoryInterface],
  },
];

const strategyProvider: Array<Provider> = [
  {
    provide: AuthDiTokens.LocalStrategy,
    useFactory: (validateUserService: ValidateUserUseCase) => new LocalStrategy(validateUserService),
    inject: [AuthDiTokens.ValidateUserService],
  },
  {
    provide: AuthDiTokens.JwtStrategy,
    useFactory: (blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) => new JwtStrategy(blacklistedTokenRepository),
    inject: [AuthDiTokens.BlacklistedTokenRepositoryInterface],
  },
  {
    provide: AuthDiTokens.RefreshTokenStrategy,
    useFactory: (blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) => new RefreshTokenStrategy(blacklistedTokenRepository),
    inject: [AuthDiTokens.BlacklistedTokenRepositoryInterface],
  },
];

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: 3000 },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [...serviceProvider, ...repositoryProvider, ...strategyProvider],
})
export class AuthModule {}
