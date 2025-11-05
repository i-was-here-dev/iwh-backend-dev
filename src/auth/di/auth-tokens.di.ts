export class AuthDiTokens {
  public static BlacklistedTokenRepositoryInterface: string = 'BlacklistedTokenRepositoryInterface';
  public static PostgresBlacklistedTokenRepositoryInterface: string = 'PostgresBlacklistedTokenRepositoryInterface';

  public static readonly GenerateAuthTokensService: string = 'GenerateAuthTokensService';
  public static readonly ValidateUserService: string = 'ValidateUserServce';
  public static readonly BlacklistTokenService: string = 'BlacklistJwtTokenService';

  public static readonly LocalStrategy: string = 'LocalStrategy';
  public static readonly JwtStrategy: string = 'JwtStrategy';
  public static readonly RefreshTokenStrategy: string = 'RefreshTokenStrategy';
}
