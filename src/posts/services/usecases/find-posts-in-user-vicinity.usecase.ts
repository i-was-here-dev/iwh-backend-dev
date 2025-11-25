import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type FindPostsInUserVicinityPort = {
  longitude: number;
  latitude: number;
  page?: number;
};

export type FindPostsInUserVicinityResponse = Array<{
  post: Post;
  approvalCount: number;
  commentCount: number;
}>;

export interface FindPostsInUserVicinityUseCase extends UseCase<FindPostsInUserVicinityPort, FindPostsInUserVicinityResponse> {}
