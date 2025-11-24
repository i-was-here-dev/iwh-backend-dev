import { CanActivate, ExecutionContext, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { createHash } from 'crypto';

export class LocationIntegrityGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    const { latitude, longitude, attestationToken } = req.body;

    if (!attestationToken) throw new UnauthorizedException('Missing attestation token');
    if (!latitude || !longitude) throw new UnprocessableEntityException('Missing context');

    const payload = `${process.env.GEO_SECRET}:${latitude}:${longitude}`;
    const expectedHash = createHash('sha256').update(payload).digest('base64');

    if (attestationToken !== expectedHash) throw new UnauthorizedException('Location tampered');

    return true;
  }
}
