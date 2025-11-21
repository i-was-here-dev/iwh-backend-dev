import { Provider } from '@nestjs/common';
import { DatabaseDiTokens } from '../di/database-tokens.di';
import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { BlacklistedToken } from 'src/auth/entities/blacklisted-token.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/posts/entities/comment.entity';
import { Approval } from 'src/posts/entities/approval.entity';

export const databaseProviders: Array<Provider> = [
  {
    provide: DatabaseDiTokens.PostgresDataSource,
    useFactory: () => {
      const dataSource: DataSource = new DataSource({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB_NAME,
        entities: [User, BlacklistedToken, Post, UserProfile, Comment, Approval],
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      });

      return dataSource.initialize();
    },
  },
];
