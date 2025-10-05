import { JwtService } from '@nestjs/jwt';
import { GenerateAuthTokensPort, GenerateAuthTokensUseCase } from './usecases/generate-auth-tokens.usecase';
import { JwtTokens } from '../types/jwt-tokens.type';

export class GenerateAuthTokensService implements GenerateAuthTokensUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(payload: GenerateAuthTokensPort): Promise<JwtTokens> {
    return {
      access_token: this.jwtService.sign({
        username: payload.username,
        email: payload.email,
        sub: payload.userId,
      }),
      refresh_token: this.jwtService.sign({ sub: payload.userId }, { expiresIn: '7d' }),
    };
  }
}
