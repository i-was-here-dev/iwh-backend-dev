import { UseCase } from 'src/common/usecase.common';

export type LogOutPort = {
  refreshToken: string;
  validationToken: string;
};

export interface LogOutUseCase extends UseCase<LogOutPort, void> {}
