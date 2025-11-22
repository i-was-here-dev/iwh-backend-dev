import { Comment } from 'src/posts/entities/comment.entity';
import { UseCase } from 'src/common/usecase.common';

export type SaveCommentPort = {
  userId: number;
  postId: number;
  body: string;
};

export interface SaveCommentUsecase extends UseCase<SaveCommentPort, Comment> {}
