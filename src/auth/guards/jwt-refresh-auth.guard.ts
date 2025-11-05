import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtRefreshAuthGuard extends AuthGuard('refresh-jwt') {
  handleRequest(err: unknown, user: any, info: any) {
    if (user) return user;

    throw new UnauthorizedException('Authentication failed');
  }
}
