import { Approval } from '../entities/approval.entity';

export interface ApprovalRepositoryInterface {
  save(approval: Approval): Promise<Approval>;
  delete(approval: Approval): Promise<boolean>;
  findByUserIdAndPostId(userId: number, postId: number): Promise<Approval>;
}
