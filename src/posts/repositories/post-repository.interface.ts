import { Post } from 'src/posts/entities/post.entity';
import { BoundingBoxQuery } from '../interfaces/bounding-box-query.interface';
import { PointLocation } from '../types/location.type';

export interface PostRepositoryInterface {
  findByUserId(userId: number): Promise<Post[] | null>;
  findByUuid(uuid: string): Promise<Post | null>;
  findByUuidWithDetails(uuid: string, userId: number): Promise<{ post: Post; approvalCount: number; isApproved: boolean } | null>;
  findInBoundingBox(query: BoundingBoxQuery): Promise<Post[] | null>;
  findInVicinity(
    pointLocation: PointLocation,
    vicinityDistance: number,
    userId: number,
    page?: number,
    limit?: number,
  ): Promise<Array<{ post: Post; approvalCount: number; commentCount: number; isApproved: boolean }> | null>;
  save(post: Post): Promise<Post>;
  softDelete(post: Post): Promise<boolean>;
}
