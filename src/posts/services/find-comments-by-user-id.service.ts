import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';
import { FindCommentsByUserIdPort, FindCommentsByUserIdUseCase } from './usecases/find-comments-by-user-id.usecase';
import { Comment } from '../entities/comment.entity';
import { NotFoundException } from '@nestjs/common';

export class FindCommentsByUserIdService implements FindCommentsByUserIdUseCase {
  constructor(private readonly commentRepository: CommentRepositoryInterface) {}

  async execute(payload: FindCommentsByUserIdPort): Promise<Comment[]> {
    const { userId } = payload;

    const comments: Comment[] = await this.commentRepository.findByUserId(userId);
    if (!comments) throw new NotFoundException('Comments not found');

    return comments;
  }
}
