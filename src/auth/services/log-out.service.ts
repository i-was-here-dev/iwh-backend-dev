import { ConflictException } from '@nestjs/common';
import { BlacklistedToken } from '../entities/blacklisted-token.entity';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { LogOutPort, LogOutUseCase } from './usecases/log-out.usecase';

export class LogOutService implements LogOutUseCase {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {}

  async execute(payload: LogOutPort): Promise<void> {
    const { refreshToken, validationToken } = payload;

    if ((await this.blacklistedTokenRepository.findByToken(validationToken)) || (await this.blacklistedTokenRepository.findByToken(refreshToken))) {
      throw new ConflictException('Expired token');
    }

    await this.blacklistRefreshToken(refreshToken);
    await this.blacklistValidationToken(validationToken);
  }

  private async blacklistRefreshToken(refreshToken: string) {
    const blacklistedRefreshToken = new BlacklistedToken();
    blacklistedRefreshToken.token = refreshToken;
    await this.blacklistedTokenRepository.save(blacklistedRefreshToken);
  }

  private async blacklistValidationToken(validationToken: string) {
    const blacklistedValidationToken = new BlacklistedToken();
    blacklistedValidationToken.token = validationToken;
    await this.blacklistedTokenRepository.save(blacklistedValidationToken);
  }
}
