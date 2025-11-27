import { UseCase } from 'src/common/usecase.common';
import { Post } from 'src/posts/entities/post.entity';

export type SavePostPort = {
  userId: number;
  location: string;
  latitude: number;
  longitude: number;
  body: string;
  title: string;
  imageName?: string;
  videoName?: string;
};

export interface SavePostUseCase extends UseCase<SavePostPort, Post> {}
