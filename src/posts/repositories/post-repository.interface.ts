import { Post } from 'src/posts/entities/post.entity';

export interface PostRepositoryInterface {
  findByUserId(userId: number): Promise<Post[] | null>;
  findByUuid(uuid: string): Promise<Post | null>;
  findByBoundingBox(centerX: number, centerY: number, boxLength: number, boxWidth: number): Promise<Post[] | null>;
  save(post: Post): Promise<Post>;
  findByUuid(uuid: string): Promise<Post | null>;
  softDelete(post: Post): Promise<boolean>;
}
