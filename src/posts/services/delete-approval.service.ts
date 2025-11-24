import { NotFoundException } from '@nestjs/common';
import { Approval } from '../entities/approval.entity';
import { ApprovalRepositoryInterface } from '../repositories/approval-repository.interface';
import { DeleteApprovalPort } from './usecases/delete-approval.usecase';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { Post } from '../entities/post.entity';

export class DeleteApprovalService implements DeleteApprovalService {
  constructor(
    private readonly approvalRepository: ApprovalRepositoryInterface,
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(payload: DeleteApprovalPort): Promise<void> {
    const { userId, postUuid } = payload;

    const post: Post = await this.postRepository.findByUuid(postUuid);
    if (!post) throw new NotFoundException('Post not found');

    const approval: Approval = await this.approvalRepository.findByUserIdAndPostId(userId, post.id);
    if (!approval) throw new NotFoundException('Approval not found');

    await this.approvalRepository.delete(approval);
  }
}
