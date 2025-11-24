import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';
import { UpdateCommentPort, UpdateCommentUseCase } from './usecases/update-comment.usecase';
import { Comment } from '../entities/comment.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { GeographyUtils } from 'src/common/utilities/geography.utility';
import { Post } from '../entities/post.entity';

export class UpdateCommentService implements UpdateCommentUseCase {
  constructor(private readonly commentRepository: CommentRepositoryInterface) {}

  async execute(payload: UpdateCommentPort): Promise<Comment> {
    const { userId, latitude, longitude, body, uuid } = payload;

    const comment = await this.commentRepository.findByUuid(uuid);
    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.user.id != userId) throw new ForbiddenException('Comment does not belong to this user');

    const post: Post = comment.post;
    if (!this.isUserNearPost(latitude, longitude, post.latitude, post.longitude)) throw new ForbiddenException('User is not near this post');

    comment.body = body;

    return await this.commentRepository.save(comment);
  }

  private isUserNearPost(userLatitude: number, userLongitude: number, postLatitude: number, postLongitude: number): boolean {
    return GeographyUtils.calculateDistance(userLatitude, userLongitude, postLatitude, postLongitude) <= 15;
  }
}
