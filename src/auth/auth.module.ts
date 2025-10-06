import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

const repositoryProvider: Array<Provider> = [];

const serviceProvider: Array<Provider> = [];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3000 },
    }),
  ],
  controllers: [],
  providers: [...serviceProvider, ...repositoryProvider],
})
export class AuthModule {}
