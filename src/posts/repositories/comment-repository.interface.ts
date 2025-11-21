import { Comment } from '../entities/comment.entity';

export interface CommentRepositoryInterface {
  findByPostId(postId: number): Promise<Comment[] | null>;
  save(comment: Comment): Promise<Comment>;
  softDelete(comment: Comment): Promise<boolean>;
}
