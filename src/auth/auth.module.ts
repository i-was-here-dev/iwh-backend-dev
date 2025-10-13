import { Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthDiTokens } from './di/auth-tokens.di';
import { GenerateAuthTokensService } from './services/generate-auth-tokens.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';

const repositoryProvider: Array<Provider> = [
  {
    provide: AuthDiTokens.GenerateAuthTokensService,
    useFactory: (jwtService: JwtService) => new GenerateAuthTokensService(jwtService),
    inject: [JwtService],
  },
];

const serviceProvider: Array<Provider> = [];

@Module({
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: 3000 },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [...serviceProvider, ...repositoryProvider],
})
export class AuthModule {}
