export class UsersDiTokens {
  public static readonly UserRepositoryInterface: string = 'UserRepositoryInterface';
  public static readonly UserProfileRepositoryInterface: string = 'UserProfileRepositoryInterface';
  public static readonly PostgresUserRepositoryInterface: string = 'PostgresUserRepository';
  public static readonly PostgresUserProfileRepositoryInterface: string = 'PostgresUserProfileRepository';

  public static readonly SaveUserService: string = 'SaveUserService';
  public static readonly FindUserByEmailService: string = 'FindUserByEmailService';
  public static readonly FindUserByUsernameService: string = 'FindUserByUsernameService';
  public static readonly FindUserByIdService: string = 'FindUserByIdService';
  public static readonly FindUserByUuidService: string = 'FindUserByUuidService';
  public static readonly FindProfileByUserIdService: string = 'FindProfileByUserIdService';
  public static readonly UpdateProfileService: string = 'UpdateProfileService';
  public static readonly FindProfileByUuidService: string = 'FindProfleByUuidService';
  public static readonly SoftDeleteUserService: string = 'SoftDeleteUserService';
}
