import { Comment } from '../entities/comment.entity';

export interface CommentRepositoryInterface {
  findByUserId(userId: number): Promise<Comment[] | null>;
  findByPostId(postId: number): Promise<Comment[] | null>;
  findByUuid(uuid: string): Promise<Comment | null>;
  save(comment: Comment): Promise<Comment>;
  softDelete(comment: Comment): Promise<boolean>;
}
