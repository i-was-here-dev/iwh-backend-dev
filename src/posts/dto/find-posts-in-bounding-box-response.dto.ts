export class FindPostsInBoundingBoxResponseDto {
  post: {
    uuid: string;
    title: string;
    body: string;
    location: string;
    latitude: number;
    longitude: number;
    imageName: string;
    videoName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

  creator: {
    uuid: string;
    profile: {
      uuid: string;
      nickname: string;
      profilePictureName: string;
      points: number;
    };
  };
}
