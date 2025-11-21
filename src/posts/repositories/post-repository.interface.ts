import { Post } from 'src/posts/entities/post.entity';
import { BoundingBoxQuery } from '../interfaces/bounding-box-query.interface';

export interface PostRepositoryInterface {
  findByUserId(userId: number): Promise<Post[] | null>;
  findByUuid(uuid: string): Promise<Post | null>;
  findInBoundingBox(query: BoundingBoxQuery): Promise<Post[] | null>;
  save(post: Post): Promise<Post>;
  findByUuid(uuid: string): Promise<Post | null>;
  softDelete(post: Post): Promise<boolean>;
}
