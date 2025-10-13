import { Module, Provider } from '@nestjs/common';
import { UserRepositoryInterface } from './repositories/user-repository.interface';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { UsersDiTokens } from './di/users-tokens.di';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { DatabaseDiTokens } from 'src/infrastructure/database/di/database-tokens.di';
import { UserRepository } from './repositories/postgres/user.repository';
import { FindUserByUsernameService } from './services/find-user-by-username.service';
import { FindUserByUuidService } from './services/find-user-by-uuid.service';
import { SaveUserService } from './services/save-user.service';
import { UserController } from './controllers/user.controller';

const repositoryProvider: Array<Provider> = [
  {
    provide: UsersDiTokens.PostgresUserRepositoryInterface,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DatabaseDiTokens.PostgresDataSource],
  },
  {
    provide: UsersDiTokens.UserRepositoryInterface,
    useFactory: (repository: Repository<User>) => new UserRepository(repository),
    inject: [UsersDiTokens.PostgresUserRepositoryInterface],
  },
];

const serviceProvider: Array<Provider> = [
  {
    provide: UsersDiTokens.FindUserByEmailService,
    useFactory: (userRepository: UserRepositoryInterface) => new FindUserByEmailService(userRepository),
    inject: [UsersDiTokens.UserRepositoryInterface],
  },
  {
    provide: UsersDiTokens.FindUserByUsernameService,
    useFactory: (userRepository: UserRepositoryInterface) => new FindUserByUsernameService(userRepository),
    inject: [UsersDiTokens.UserRepositoryInterface],
  },
  {
    provide: UsersDiTokens.SaveUserService,
    useFactory: (userRepository: UserRepositoryInterface) => new SaveUserService(userRepository),
    inject: [UsersDiTokens.UserRepositoryInterface],
  },
  {
    provide: UsersDiTokens.FindUserByUuidService,
    useFactory: (userRepository: UserRepositoryInterface) => new FindUserByUuidService(userRepository),
    inject: [UsersDiTokens.UserRepositoryInterface],
  },
];

@Module({
  exports: [UsersDiTokens.SaveUserService],
  providers: [...serviceProvider, ...repositoryProvider],
  controllers: [UserController],
})
export class UsersModule {}
