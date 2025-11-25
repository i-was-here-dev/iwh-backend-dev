export class FindPostByUuidResponseDto {
  post: {
    uuid: string;
    title: string;
    body: string;
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
    username: string;
    profile: {
      uuid: string;
      nickname: string;
      profilePictureName: string;
      points: number;
    };
  };

  comments: {
    uuid: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    user: {
      uuid: string;
      username: string;
      profile: {
        uuid: string;
        nickname: string;
        profilePictureName: string;
        points: number;
      };
    };
  }[];

  approvalCount: number;
}
