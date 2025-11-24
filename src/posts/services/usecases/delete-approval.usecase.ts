import { UseCase } from 'src/common/usecase.common';

export type DeleteApprovalPort = {
  postUuid: string;
  userId: number;
};

export interface DeleteApprovalUseCase extends UseCase<DeleteApprovalPort, void> {}
