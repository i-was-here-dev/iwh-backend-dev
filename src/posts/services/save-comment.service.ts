import { Comment } from '../entities/comment.entity';
import { SaveCommentPort, SaveCommentUsecase } from './usecases/save-comment.usecase';
import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';

export class SaveCommentService implements SaveCommentUsecase {
  constructor(private readonly commentRepository: CommentRepositoryInterface) {}

  async execute(payload: SaveCommentPort): Promise<Comment> {
    const { userId, postId, body } = payload;

    const comment = Comment.create({
      userId: userId,
      postId: postId,
      body: body,
    });

    return await this.commentRepository.save(comment);
  }
}
