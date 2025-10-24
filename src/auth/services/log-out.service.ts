import { BlacklistedToken } from '../entities/blacklisted-token.entity';
import { BlacklistedTokenRepositoryInterface } from '../repositories/blacklisted-token-repository.interface';
import { LogOutPort, LogOutUseCase } from './usecases/log-out.usecase';

export class LogOutService implements LogOutUseCase {
  constructor(private readonly blacklistedTokenRepository: BlacklistedTokenRepositoryInterface) {}

  async execute(payload: LogOutPort): Promise<void> {
    const { refreshToken, validationToken } = payload;

    const blackListedRefreshToken = new BlacklistedToken();
    blackListedRefreshToken.token = refreshToken;

    const blacklistedValidationToken = new BlacklistedToken();
    blacklistedValidationToken.token = validationToken;

    await this.blacklistedTokenRepository.save(blackListedRefreshToken);
    await this.blacklistedTokenRepository.save(blacklistedValidationToken);
  }
}
