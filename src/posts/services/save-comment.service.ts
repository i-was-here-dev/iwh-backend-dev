import { Comment } from '../entities/comment.entity';
import { SaveCommentPort, SaveCommentUsecase } from './usecases/save-comment.usecase';
import { CommentRepositoryInterface } from '../repositories/comment-repository.interface';
import { NotFoundException } from '@nestjs/common';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { GeographyUtils } from 'src/common/utilities/geography.utility';

export class SaveCommentService implements SaveCommentUsecase {
  constructor(
    private readonly commentRepository: CommentRepositoryInterface,
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(payload: SaveCommentPort): Promise<Comment> {
    const { userId, postUuid, body, userLatitude, userLongitude } = payload;

    const post = await this.postRepository.findByUuid(postUuid);
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    const distance = GeographyUtils.calculateDistance(userLatitude, userLongitude, post.latitude, post.longitude);

    if (distance > 15) {
      throw new Error('You are too far away from the post to comment');
    }

    const comment = new Comment();
    comment.userId = userId;
    comment.postUuid = postUuid;
    comment.body = body;

    return await this.commentRepository.save(comment);
  }
}
