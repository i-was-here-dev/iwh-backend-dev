import { UseCase } from 'src/common/usecase.common';

export type BlacklistJwtTokenPort = {
  jwtToken: string;
};

export interface BlacklistJwtTokenUseCase extends UseCase<BlacklistJwtTokenPort, void> {}
