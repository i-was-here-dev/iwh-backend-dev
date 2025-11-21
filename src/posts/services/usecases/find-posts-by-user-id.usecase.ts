import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type FindPostsByUserIdPort = {
  userId: number;
};

export interface FindPostsByUserIdUseCase extends UseCase<FindPostsByUserIdPort, Post[]> {}
