import { BadRequestException, ConflictException } from '@nestjs/common';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { BlacklistJwtTokenPort, BlacklistJwtTokenUseCase } from './usecases/blacklist-jwt-token.usecase';

export class BlacklistJwtTokenService implements BlacklistJwtTokenUseCase {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {}

  async execute(payload: BlacklistJwtTokenPort): Promise<void> {
    const { jwtToken } = payload;
    if (!jwtToken) throw new BadRequestException('Required parameters are missing');

    const existingJwtToken: BlacklistedToken | null = await this.blacklistedTokenRepository.findByToken(jwtToken);
    if (existingJwtToken) throw new ConflictException('Token already blacklisted');

    const blacklistedJwtToken = new BlacklistedToken();
    blacklistedJwtToken.token = jwtToken;

    await this.blacklistedTokenRepository.save(blacklistedJwtToken);
  }
}
