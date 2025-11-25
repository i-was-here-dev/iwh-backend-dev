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
    uuid: string;
    nickname: string;
    profilePictureName: string;
    points: number;
  };
  refreshToken: string;
  accessToken: string;
}
