import { UseCase } from 'src/common/usecase.common';

export type SaveApprovalPort = {
  postUuid: string;
  userId: number;
  userLatitude: number;
  userLongitude: number;
};

export interface SaveApprovalUseCase extends UseCase<SaveApprovalPort, void> {}
