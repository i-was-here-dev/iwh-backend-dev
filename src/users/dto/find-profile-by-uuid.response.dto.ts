export class FindProfileByUuidResponseDto {
  profile: {
    uuid: string;
    nickname: string;
    points: number;
    profilePictureName: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
  };
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
}
