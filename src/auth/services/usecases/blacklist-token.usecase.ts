import { UseCase } from 'src/common/usecase.common';

export type BlacklistTokenPort = {
  token: string;
};

export interface BlacklistTokenUseCase extends UseCase<BlacklistTokenPort, void> {}
