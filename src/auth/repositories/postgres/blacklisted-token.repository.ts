import { BlacklistedTokenRepositoryInterface } from 'src/auth/repositories/blacklisted-token-repository.interface';
import { BlacklistedToken } from '../../entities/blacklisted-token.entity';
import { Repository } from 'typeorm';

export class BlacklistedTokenRepository implements BlacklistedTokenRepositoryInterface {
  constructor(private readonly repository: Repository<BlacklistedToken>) {}

  async save(token: BlacklistedToken): Promise<BlacklistedToken> {
    return await this.repository.save(token);
  }

  async findByToken(token: string): Promise<BlacklistedToken | null> {
    return await this.repository.findOne({
      where: { token: token },
    });
  }
}
