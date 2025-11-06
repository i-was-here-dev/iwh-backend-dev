import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any, info: any, context: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
