import { Module, Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostsDiTokens } from './di/posts-tokens.di';
import { Post } from './entities/post.entity';
import { DatabaseDiTokens } from 'src/infrastructure/database/di/database-tokens.di';
import { PostRepository } from './repositories/postgres/post.repository';
import { PostRepositoryInterface } from './repositories/post-repository.interface';
import { SavePostService } from './services/save-post.service';

const repositoryProviders: Provider[] = [
  {
    provide: PostsDiTokens.PostgresPostRepositoryInterface,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: [DatabaseDiTokens.PostgresDataSource],
  },
  {
    provide: PostsDiTokens.PostRepositoryInterface,
    useFactory: (repository: Repository<Post>) => new PostRepository(repository),
    inject: [PostsDiTokens.PostgresPostRepositoryInterface],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: PostsDiTokens.SavePostService,
    useFactory: (postRepository: PostRepositoryInterface) => new SavePostService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
];

@Module({
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PostsModule {}
