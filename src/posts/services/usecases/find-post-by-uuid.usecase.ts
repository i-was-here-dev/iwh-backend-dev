import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type FindPostByUuidPort = {
  longitude: number;
  latitude: number;
  uuid: string;
  userId: number;
};

export type FindPostByUuidResponse = {
  post: Post;
  approvalCount: number;
  isApproved: boolean;
};

export interface FindPostByUuidUseCase extends UseCase<FindPostByUuidPort, FindPostByUuidResponse> {}
