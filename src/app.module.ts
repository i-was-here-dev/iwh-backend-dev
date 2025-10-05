import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UsersModule],
})
export class AppModule {}
