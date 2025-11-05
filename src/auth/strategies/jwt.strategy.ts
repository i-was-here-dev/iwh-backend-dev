import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtStrategyPayload } from '../types/jwt-strategy-payload.type';
import { JwtStrategyResponse } from '../types/jwt-strategy-response.type';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtStrategyPayload): Promise<JwtStrategyResponse> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const blacklistedToken = await this.blacklistedTokenRepository.findByToken(token);
    if (blacklistedToken) throw new UnauthorizedException();

    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
