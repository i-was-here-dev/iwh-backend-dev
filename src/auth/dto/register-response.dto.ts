export class RegisterResponseDto {
  user: {
    username: string;
    email: string;
    uuid: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  refreshToken: string;
  accessToken: string;
}
