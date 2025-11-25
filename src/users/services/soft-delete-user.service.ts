import { UserRepositoryInterface } from '../repositories/user-repository.interface';
import { SoftDeleteUserPort, SoftDeleteUserUsecase } from './usecases/soft-delete-user.usecase';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

export class SoftDeleteUserService implements SoftDeleteUserUsecase {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(payload: SoftDeleteUserPort): Promise<boolean> {
    const { id } = payload;

    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return await this.userRepository.softDelete(user);
  }
}
