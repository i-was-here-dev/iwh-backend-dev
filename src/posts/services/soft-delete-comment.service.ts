import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Comment } from '../entities/comment.entity';
import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';
import { SoftDeleteCommentPort, SoftDeleteCommentUseCase } from './usecases/soft-delete-comment.usecase';
import { GeographyUtils } from 'src/common/utilities/geography.utility';

export class SoftDeleteCommentService implements SoftDeleteCommentUseCase {
  constructor(private readonly commentRepository: CommentRepositoryInterface) {}

  async execute(payload: SoftDeleteCommentPort): Promise<boolean> {
    const { userId, uuid, latitude, longitude } = payload;

    const comment: Comment | null = await this.commentRepository.findByUuid(uuid);
    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.user.id !== userId) throw new ForbiddenException('Comment does not belong to this user');

    if (!this.isUserNearPost(latitude, longitude, comment.post.latitude, comment.post.longitude))
      throw new ForbiddenException('User must be within 15 meters of the post');

    return await this.commentRepository.softDelete(comment);
  }

  private isUserNearPost(userLatitude: number, userLongitude: number, postLatitude: number, postLongitude: number): boolean {
    return GeographyUtils.calculateDistance(userLatitude, userLongitude, postLatitude, postLongitude) <= 50;
  }
}
