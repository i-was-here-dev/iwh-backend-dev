import { UseCase } from 'src/common/usecase.common';

export type SoftDeleteCommentPort = {
  userId: number;
  uuid: string;
};

export interface SoftDeleteCommentUseCase extends UseCase<SoftDeleteCommentPort, boolean> {}
