import { Comment } from 'src/posts/entities/comment.entity';
import { UseCase } from 'src/common/usecase.common';

export type SaveCommentPort = {
  userId: number;
  postUuid: string;
  body: string;
  userLatitude: number;
  userLongitude: number;
};

export interface SaveCommentUsecase extends UseCase<SaveCommentPort, Comment> {}
