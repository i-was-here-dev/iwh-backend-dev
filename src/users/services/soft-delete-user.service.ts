import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { SoftDeleteUserPort, SoftDeleteUserUsecase } from './usecases/soft-delete-user.usecase';
import { UnauthorizedException } from '@nestjs/common';

export class SoftDeleteUserService implements SoftDeleteUserUsecase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: SoftDeleteUserPort): Promise<boolean> {
    const { id, uuid } = payload;

    const user: User | null = await this.userRepository.findByUuid(uuid);
    if (user.id !== id) throw new UnauthorizedException();

    return await this.userRepository.softDelete(user);
  }
}
