import { ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { ApprovalRepositoryInterface } from '../repositories/approval-repository.interface';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { SaveApprovalPort, SaveApprovalUseCase } from './usecases/save-approval.usecase';
import { Approval } from '../entities/approval.entity';
import { GeographyUtils } from 'src/common/utilities/geography.utility';

export class SaveApprovalService implements SaveApprovalUseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepositoryInterface,
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(payload: SaveApprovalPort): Promise<void> {
    const { postUuid, userId, userLongitude, userLatitude } = payload;

    const post: Post = await this.postRepository.findByUuid(postUuid);
    if (!post) throw new NotFoundException('Post not found');

    const existingApproval = await this.approvalRepository.findByUserIdAndPostId(userId, post.id);
    if (existingApproval) throw new ConflictException('Approval already exists');

    if (!this.isUserNearPost(userLatitude, userLongitude, post.latitude, post.longitude)) throw new ForbiddenException('User is not near post');

    const approval = new Approval();
    approval.post = post;
    approval.userId = userId;

    await this.approvalRepository.save(approval);
  }

  private isUserNearPost(userLatitude: number, userLongitude: number, postLatitude: number, postLongitude: number): boolean {
    return GeographyUtils.calculateDistance(userLatitude, userLongitude, postLatitude, postLongitude) <= 15;
  }
}
