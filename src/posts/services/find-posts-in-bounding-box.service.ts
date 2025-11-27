import { NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { FindPostsInBoundingBoxPort, FindPostsInBoundingBoxUseCase } from './usecases/find-posts-in-bounding-box.usecase';

export class FindPostsInBoundingBoxService implements FindPostsInBoundingBoxUseCase {
  constructor(
    private readonly postRepository: PostRepositoryInterface,
    private readonly DEFAULT_LIMIT: number = 15,
  ) {}

  async execute(payload: FindPostsInBoundingBoxPort): Promise<Post[]> {
    const { latitude, longitude, boxWidth, boxLength } = payload;

    console.log(latitude, longitude);
    console.log(boxWidth, boxLength);

    const posts: Post[] = await this.postRepository.findInBoundingBox({
      centerLatitude: latitude,
      centerLongitude: longitude,
      boxWidth: boxWidth,
      boxLength: boxLength,
      limit: this.DEFAULT_LIMIT,
    });

    if (!posts) throw new NotFoundException('Posts not found');

    console.log(posts);

    return posts;
  }
}
