import { NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { FindPostsByUserIdPort, FindPostsByUserIdUseCase } from './usecases/find-posts-by-user-id.usecase';

export class FindPostsByUserIdService implements FindPostsByUserIdUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(payload: FindPostsByUserIdPort): Promise<Post[]> {
    const { userId } = payload;

    const posts: Post[] = await this.postRepository.findByUserId(userId);
    if (!posts) throw new NotFoundException('Posts not found');

    return posts;
  }
}
