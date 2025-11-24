import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenStrategyPayload } from '../types/refresh-token-strategy-payload.type';
import { RefreshTokenStrategyResponse } from '../types/refresh-token-strategy-response.type';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { UnauthorizedException } from '@nestjs/common';

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader('refresh-token')]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenStrategyPayload): Promise<RefreshTokenStrategyResponse> {
    const token = ExtractJwt.fromExtractors([ExtractJwt.fromHeader('refresh-token')])(req);

    const blacklistedToken = await this.blacklistedTokenRepository.findByToken(token);
    if (blacklistedToken) throw new UnauthorizedException();

    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
