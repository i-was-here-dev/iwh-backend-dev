import { ConflictException, NotFoundException } from '@nestjs/common';
import { Post } from '../entities/post.entity';
import { ApprovalRepositoryInterface } from '../repositories/approval-repository.interface';
import { PostRepositoryInterface } from '../repositories/post-repository.interface';
import { SaveApprovalPort, SaveApprovalUseCase } from './usecases/save-approval.usecase';
import { Approval } from '../entities/approval.entity';

export class SaveApprovalService implements SaveApprovalUseCase {
  constructor(
    private readonly approvalRepository: ApprovalRepositoryInterface,
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(payload: SaveApprovalPort): Promise<void> {
    const { postUuid, userId } = payload;

    const post: Post = await this.postRepository.findByUuid(postUuid);
    if (!post) throw new NotFoundException('Post not found');

    const existingApproval = await this.approvalRepository.findByUserIdAndPostId(userId, post.id);
    if (existingApproval) throw new ConflictException('Approval already exists');

    const approval = new Approval();
    approval.post = post;
    approval.userId = userId;

    await this.approvalRepository.save(approval);
  }
}
