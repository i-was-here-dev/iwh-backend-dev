import { UseCase } from 'src/common/usecase.common';

export type SoftDeleteCommentPort = {
  userId: number;
  uuid: string;
  longitude: number;
  latitude: number;
};

export interface SoftDeleteCommentUseCase extends UseCase<SoftDeleteCommentPort, boolean> {}
