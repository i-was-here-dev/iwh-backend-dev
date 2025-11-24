import { UseCase } from 'src/common/usecase.common';
import { Comment } from '../../entities/comment.entity';

export type UpdateCommentPort = {
  userId: number;
  body: string;
  latitude: number;
  longitude: number;
  uuid: string;
};

export interface UpdateCommentUseCase extends UseCase<UpdateCommentPort, Comment> {}
