import { UseCase } from 'src/common/usecase.common';

export type BlacklistRefreshTokenPort = {
  refreshToken: string;
};

export interface BlacklistRefreshTokenUseCase extends UseCase<BlacklistRefreshTokenPort, void> {}
