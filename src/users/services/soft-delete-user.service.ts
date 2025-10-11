import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { SoftDeleteUserPort, SoftDeleteUserUsecase } from './usecases/soft-delete-user.usecase';

export class SoftDeleteUserService implements SoftDeleteUserUsecase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: SoftDeleteUserPort): Promise<boolean> {
    const { id } = payload;

    const user: User | null = await this.userRepository.findById(id);

    return await this.userRepository.softDelete(user);
  }
}
