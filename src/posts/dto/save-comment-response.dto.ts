export class SaveCommentResponseDto {
  comment: {
    uuid: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
}
