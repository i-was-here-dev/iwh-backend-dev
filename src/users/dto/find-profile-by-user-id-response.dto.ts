export class FindProfileByUserIdResponseDto {
  uuid: string;
  nickname: string;
  points: number;
  profilePictureName: string;
  posts: {
    uuid: string;
    title: string;
    body: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
  }[];
  comments: {
    uuid: string;
    body: string;
    createdAt: Date;
  }[];
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
