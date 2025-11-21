export class RegisterResponseDto {
  user: {
    username: string;
    email: string;
    uuid: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  profile: {
    nickname: string;
    profilePictureName: string;
  };
  refreshToken: string;
  accessToken: string;
}
