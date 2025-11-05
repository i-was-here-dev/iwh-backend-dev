import { BadRequestException, ConflictException } from '@nestjs/common';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { BlacklistTokenPort, BlacklistTokenUseCase as BlacklistTokenUseCase } from './usecases/blacklist-token.usecase';

export class BlacklistTokenService implements BlacklistTokenUseCase {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {}

  async execute(payload: BlacklistTokenPort): Promise<void> {
    const { token } = payload;
    if (!token) throw new BadRequestException('Required parameters are missing');

    const existingJwtToken: BlacklistedToken | null = await this.blacklistedTokenRepository.findByToken(token);
    if (existingJwtToken) throw new ConflictException('Token already blacklisted');

    const blacklistedJwtToken = new BlacklistedToken();
    blacklistedJwtToken.token = token;

    await this.blacklistedTokenRepository.save(blacklistedJwtToken);
  }
}
