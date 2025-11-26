import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { FindPostByUuidPort, FindPostByUuidUseCase, FindPostByUuidResponse } from './usecases/find-post-by-uuid.usecase';
import { GeographyUtils } from 'src/common/utilities/geography.utility';

export class FindPostByUuidService implements FindPostByUuidUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(payload: FindPostByUuidPort): Promise<FindPostByUuidResponse> {
    const { longitude, latitude, uuid } = payload;

    const result = await this.postRepository.findByUuidWithDetails(uuid);
    if (!result) throw new NotFoundException('Post not found');

    const { post, approvalCount } = result;

    if (!this.isUserNearPost(longitude, latitude, post.longitude, post.latitude)) {
      throw new ForbiddenException('User must be within 15 meters of the post');
    }

    return { post, approvalCount };
  }

  private isUserNearPost(userLatitude: number, userLongitude: number, postLatitude: number, postLongitude: number): boolean {
    return GeographyUtils.calculateDistance(userLatitude, userLongitude, postLatitude, postLongitude) <= 15;
  }
}
