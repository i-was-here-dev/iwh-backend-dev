import { UseCase } from 'src/common/usecase.common';

export type SoftDeleteUserPort = {
  id: number;
};

export interface SoftDeleteUserUsecase extends UseCase<SoftDeleteUserPort, boolean> {}
