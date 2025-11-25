export class SavePostResponseDto {
  post: {
    uuid: string;
    latitude: number;
    longitude: number;
    title: string;
    body: string;
    videoName: string;
    imageName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
}
