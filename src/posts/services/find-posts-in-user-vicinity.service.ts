import { NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import {
  FindPostsInUserVicinityPort,
  FindPostsInUserVicinityUseCase,
  FindPostsInUserVicinityResponse,
} from './usecases/find-posts-in-user-vicinity.usecase';

export class FindPostsInUserVicinityService implements FindPostsInUserVicinityUseCase {
  constructor(
    private readonly postRepository: PostRepositoryInterface,
    private readonly DEFAULT_LIMIT: number = 5,
    private readonly VICINITY_DISTANCE: number = 50, // in meters
  ) {}

  async execute(payload: FindPostsInUserVicinityPort): Promise<FindPostsInUserVicinityResponse> {
    const { latitude, longitude, userId, page = 1 } = payload;

    console.log(longitude, latitude);

    const result = await this.postRepository.findInVicinity(
      { latitude: latitude, longitude: longitude },
      this.VICINITY_DISTANCE,
      userId,
      page,
      this.DEFAULT_LIMIT,
    );

    if (!result) throw new NotFoundException('Posts not found');

    return result;
  }
}
