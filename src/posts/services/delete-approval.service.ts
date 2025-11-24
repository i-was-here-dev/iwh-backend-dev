import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Approval } from '../entities/approval.entity';
import { ApprovalRepositoryInterface } from '../repositories/approval-repository.interface';
import { DeleteApprovalPort } from './usecases/delete-approval.usecase';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { Post } from '../entities/post.entity';
import { GeographyUtils } from 'src/common/utilities/geography.utility';

export class DeleteApprovalService implements DeleteApprovalService {
  constructor(
    private readonly approvalRepository: ApprovalRepositoryInterface,
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(payload: DeleteApprovalPort): Promise<void> {
    const { userId, postUuid, latitude, longitude } = payload;

    const post: Post = await this.postRepository.findByUuid(postUuid);
    if (!post) throw new NotFoundException('Post not found');

    const approval: Approval = await this.approvalRepository.findByUserIdAndPostId(userId, post.id);
    if (!approval) throw new NotFoundException('Approval not found');

    if (!this.isUserNearPost(latitude, longitude, post.latitude, post.longitude)) throw new ForbiddenException('User is not near post');

    await this.approvalRepository.delete(approval);
  }

  private isUserNearPost(userLatitude: number, userLongitude: number, postLatitude: number, postLongitude: number): boolean {
    return GeographyUtils.calculateDistance(userLatitude, userLongitude, postLatitude, postLongitude) <= 15;
  }
}
