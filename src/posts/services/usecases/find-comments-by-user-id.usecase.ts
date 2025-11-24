import { UseCase } from 'src/common/usecase.common';
import { Comment } from 'src/posts/entities/comment.entity';

export type FindCommentsByUserIdPort = {
  userId: number;
};

export interface FindCommentsByUserIdUseCase extends UseCase<FindCommentsByUserIdPort, Comment[]> {}
