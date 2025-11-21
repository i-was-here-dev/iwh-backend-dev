import { Comment } from 'src/posts/entities/comment.entity';
import { CommentRepositoryInterface } from '../comment-repository.interface';
import { Repository, UpdateResult } from 'typeorm';

export class CommentRepository implements CommentRepositoryInterface {
  constructor(private readonly repository: Repository<Comment>) {}

  async findByPostId(postId: number): Promise<Comment[] | null> {
    return await this.repository.find({
      where: {
        post: { id: postId },
      },
      relations: ['post'],
    });
  }

  async save(comment: Comment): Promise<Comment> {
    return await this.repository.save(comment);
  }

  async softDelete(comment: Comment): Promise<boolean> {
    const result: UpdateResult = await this.repository.softDelete(comment.id);

    if (result.affected > 0) return true;
    return false;
  }
}
