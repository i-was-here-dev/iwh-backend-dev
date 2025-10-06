import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStrategyPayload } from '../types/jwt-strategy-payload.type';
import { JwtStrategyResponse } from '../types/jwt-strategy-response.type';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtStrategyPayload): Promise<JwtStrategyResponse> {
    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
