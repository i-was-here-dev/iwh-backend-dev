import { Module, Provider } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostsDiTokens } from './di/posts-tokens.di';
import { Post } from './entities/post.entity';
import { DatabaseDiTokens } from 'src/infrastructure/database/di/database-tokens.di';
import { PostRepository } from './repositories/postgres/post.repository';
import { PostRepositoryInterface } from './repositories/post-repository.interface';
import { SavePostService } from './services/save-post.service';
import { Approval } from './entities/approval.entity';
import { ApprovalRepository } from './repositories/postgres/approval.repository';
import { ApprovalRepositoryInterface } from './repositories/approval-repository.interface';
import { SaveApprovalService } from './services/save-approval.service';
import { FindPostsByUserIdService } from './services/find-posts-by-user-id.service';
import { FindPostByUuidService } from './services/find-post-by-uuid.service';
import { FindPostsInUserVicinityService } from './services/find-posts-in-user-vicinity.service';
import { FindPostsInBoundingBoxService } from './services/find-posts-in-bounding-box.service';

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
  {
    provide: PostsDiTokens.PostgresApprovalRepositoryInterface,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Approval),
    inject: [DatabaseDiTokens.PostgresDataSource],
  },
  {
    provide: PostsDiTokens.ApprovalRepositoryInterface,
    useFactory: (repository: Repository<Approval>) => new ApprovalRepository(repository),
    inject: [PostsDiTokens.PostgresApprovalRepositoryInterface],
  },
];

const serviceProviders: Provider[] = [
  {
    provide: PostsDiTokens.SavePostService,
    useFactory: (postRepository: PostRepositoryInterface) => new SavePostService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.SaveApprovalService,
    useFactory: (approvalRepository: ApprovalRepositoryInterface, postRepository: PostRepositoryInterface) =>
      new SaveApprovalService(approvalRepository, postRepository),
    inject: [PostsDiTokens.ApprovalRepositoryInterface, PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.FindPostsByUserIdService,
    useFactory: (postRepository: PostRepositoryInterface) => new FindPostsByUserIdService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.FindPostByUuidService,
    useFactory: (postRepository: PostRepositoryInterface) => new FindPostByUuidService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.FindPostsInUserVicinityService,
    useFactory: (postRepository: PostRepositoryInterface) => new FindPostsInUserVicinityService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.FindPostsInBoundingBoxService,
    useFactory: (postRepository: PostRepositoryInterface) => new FindPostsInBoundingBoxService(postRepository),
    inject: [PostsDiTokens.PostRepositoryInterface],
  },
];

@Module({
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PostsModule {}
