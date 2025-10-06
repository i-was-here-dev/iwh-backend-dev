import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenStrategyPayload } from '../types/refresh-token-strategy-payload.type';
import { RefreshTokenStrategyResponse } from '../types/refresh-token-strategy-response.type';

export class RefreshTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromHeader('refresh-token')]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: RefreshTokenStrategyPayload): Promise<RefreshTokenStrategyResponse> {
    return {
      userId: payload.sub,
    };
  }
}
