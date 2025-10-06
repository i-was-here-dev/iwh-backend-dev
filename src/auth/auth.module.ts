import { Module, Provider } from '@nestjs/common';

const repositoryProvider: Array<Provider> = [];

const serviceProvider: Array<Provider> = [];

@Module({
  controllers: [],
  providers: [...serviceProvider, ...repositoryProvider],
})
export class AuthModule {}
