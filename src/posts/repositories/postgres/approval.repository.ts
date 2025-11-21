import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ApprovalRepositoryInterface } from '../approval-repository.interface';
import { Approval } from 'src/posts/entities/approval.entity';

export class ApprovalRepository implements ApprovalRepositoryInterface {
  constructor(private readonly repository: Repository<Approval>) {}

  async save(approval: Approval): Promise<Approval> {
    return await this.repository.save(approval);
  }

  async findByUserIdAndPostId(userId: number, postId: number): Promise<Approval> {
    return await this.repository.findOne({
      where: {
        userId: userId,
        post: {
          id: postId,
        },
      },
    });
  }

  async delete(approval: Approval): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(approval.id);

    return result.affected > 0;
  }
}
