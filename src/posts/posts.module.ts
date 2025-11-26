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
import { UpdateCommentService } from './services/update-comment.service';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repositories/postgres/comment.repository';
import { CommentRepositoryInterface } from './repositories/comment-repository.interface';
import { DeleteApprovalService } from './services/delete-approval.service';
import { PostController } from './controllers/post.controller';
import { SaveCommentService } from './services/save-comment.service';
import { CommentController } from './controllers/comment.controller';
import { SoftDeleteCommentService } from './services/soft-delete-comment.service';
import { ApprovalController } from './controllers/approval.controller';

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
  {
    provide: PostsDiTokens.PostgresCommentRepositoryInterface,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: [DatabaseDiTokens.PostgresDataSource],
  },
  {
    provide: PostsDiTokens.CommentRepositoryInterface,
    useFactory: (repository: Repository<Comment>) => new CommentRepository(repository),
    inject: [PostsDiTokens.PostgresCommentRepositoryInterface],
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
  {
    provide: PostsDiTokens.UpdateCommentService,
    useFactory: (commentRepository: CommentRepositoryInterface) => new UpdateCommentService(commentRepository),
    inject: [PostsDiTokens.CommentRepositoryInterface],
  },
  {
    provide: PostsDiTokens.DeleteApprovalService,
    useFactory: (approvalRepository: ApprovalRepositoryInterface, postRepository: PostRepositoryInterface) =>
      new DeleteApprovalService(approvalRepository, postRepository),
    inject: [PostsDiTokens.ApprovalRepositoryInterface, PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.SaveCommentService,
    useFactory: (commentRepository: CommentRepositoryInterface, postRepository: PostRepositoryInterface) =>
      new SaveCommentService(commentRepository, postRepository),
    inject: [PostsDiTokens.CommentRepositoryInterface, PostsDiTokens.PostRepositoryInterface],
  },
  {
    provide: PostsDiTokens.SoftDeleteCommentService,
    useFactory: (commentRepository: CommentRepositoryInterface) => new SoftDeleteCommentService(commentRepository),
    inject: [PostsDiTokens.CommentRepositoryInterface],
  },
];

@Module({
  controllers: [PostController, CommentController, ApprovalController],
  providers: [...repositoryProviders, ...serviceProviders],
})
export class PostsModule {}
