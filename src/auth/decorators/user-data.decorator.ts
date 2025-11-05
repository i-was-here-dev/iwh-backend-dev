import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuardResponse } from '../interfaces/jwt-auth-guard-response.interface';

export const UserData = createParamDecorator((data: unknown, ctx: ExecutionContext): JwtAuthGuardResponse => {
  const request = ctx?.switchToHttp?.().getRequest?.();
  return request?.user as JwtAuthGuardResponse | undefined;
});
