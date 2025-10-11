import { BlacklistedToken } from 'src/auth/entities/token.entity';

export interface BlacklistedTokenRepositoryInterface {
  save(token: BlacklistedToken): Promise<BlacklistedToken>;
  findByToken(token: string): Promise<BlacklistedToken | null>;
}
