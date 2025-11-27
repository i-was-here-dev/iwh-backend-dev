import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type FindPostsInUserVicinityPort = {
  longitude: number;
  latitude: number;
  userId: number;
  page?: number;
};

export type FindPostsInUserVicinityResponse = Array<{
  post: Post;
  approvalCount: number;
  commentCount: number;
  isApproved: boolean;
}>;

export interface FindPostsInUserVicinityUseCase extends UseCase<FindPostsInUserVicinityPort, FindPostsInUserVicinityResponse> {}
