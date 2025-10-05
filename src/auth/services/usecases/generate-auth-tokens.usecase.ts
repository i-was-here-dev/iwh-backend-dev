import { JwtTokens } from 'src/auth/types/jwt-tokens.type';
import { UseCase } from 'src/common/usecase.common';

export type GenerateAuthTokensPort = {
  username: string;
  email: string;
  userId: number;
};

export interface GenerateAuthTokensUseCase extends UseCase<GenerateAuthTokensPort, JwtTokens> {}
