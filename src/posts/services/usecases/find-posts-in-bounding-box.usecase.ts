import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type FindPostsInBoundingBoxPort = {
  longitude: number;
  latitude: number;
  boxLength: number;
  boxWidth: number;
};

export interface FindPostsInBoundingBoxUseCase extends UseCase<FindPostsInBoundingBoxPort, Post[]> {}
