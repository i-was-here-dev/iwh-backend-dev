import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';
import { SoftDeleteCommentPort, SoftDeleteCommentUseCase } from './usecases/soft-delete-comment.usecase';

export class SoftDeleteCommentService implements SoftDeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepositoryInterface) {}

  async execute(payload: SoftDeleteCommentPort): Promise<boolean> {
    const { userId, uuid } = payload;

    const comment: Comment | null = await this.commentRepository.findByUuid(uuid);

    if (!comment) throw new NotFoundException();

    if (comment.user.id !== userId) throw new UnauthorizedException();

    return await this.commentRepository.softDelete(comment);
  }
}
