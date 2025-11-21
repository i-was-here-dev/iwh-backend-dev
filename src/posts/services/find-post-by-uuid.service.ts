import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { FindPostByUuidPort, FindPostByUuidUseCase } from './usecases/find-post-by-uuid.service';
import { PointLocation } from '../types/location.type';

export class FindPostByUuidService implements FindPostByUuidUseCase {
  constructor(private readonly postRepository: PostRepositoryInterface) {}

  async execute(payload: FindPostByUuidPort): Promise<Post> {
    const { longitude, latitude, uuid } = payload;

    const post: Post = await this.postRepository.findByUuid(uuid);
    if (!post) throw new NotFoundException('Post not found');

    const distanceInMeters = this.calculateDistanceBetweenPoints(
      { latitude: latitude, longitude: longitude },
      { latitude: post.latitude, longitude: post.longitude },
    );

    if (distanceInMeters > 15) {
      throw new ForbiddenException('User must be within 15 meters of the post');
    }

    return post;
  }

  private calculateDistanceBetweenPoints(locationA: PointLocation, locationB: PointLocation) {
    const latitudeDiff = (locationB.latitude - locationA.latitude) * 111000; // 1 degree = 111km
    const longitudeDiff = (locationB.longitude - locationA.longitude) * 111000;

    return Math.sqrt(latitudeDiff * longitudeDiff + longitudeDiff * latitudeDiff);
  }
}
