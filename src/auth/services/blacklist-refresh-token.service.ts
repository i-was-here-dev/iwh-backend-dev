import { BadRequestException, ConflictException } from '@nestjs/common';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { BlacklistRefreshTokenPort, BlacklistRefreshTokenUseCase } from './usecases/blacklist-refresh-token.usecase';

export class BlacklistRefreshTokenService implements BlacklistRefreshTokenUseCase {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {}

  async execute(payload: BlacklistRefreshTokenPort): Promise<void> {
    const { refreshToken } = payload;
    if (!refreshToken) throw new BadRequestException('Required parameters are missing');

    const existingRefreshToken: BlacklistedToken | null = await this.blacklistedTokenRepository.findByToken(refreshToken);
    if (existingRefreshToken) throw new ConflictException('Token already blacklisted');

    const blacklistedRefreshToken = new BlacklistedToken();
    blacklistedRefreshToken.token = refreshToken;

    await this.blacklistedTokenRepository.save(blacklistedRefreshToken);
  }
}
