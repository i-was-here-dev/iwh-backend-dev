import { Controller, Inject, Get, Param } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UsersDiTokens } from '../di/users-tokens.di';
import { FindProfileByUserIdPort, FindProfileByUserIdUseCase } from '../services/usecases/find-profile-by-user.id.usecase';
import { FindProfileByUserIdResponseDto } from '../dto/find-profile-by-user-id-response.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(UsersDiTokens.FindProfileByUserIdService)
    private readonly findProfileByUserIdService: FindProfileByUserIdUseCase,
  ) {}

  @Get(':id')
  async findByUserId(@Param('id') id: number): Promise<FindProfileByUserIdResponseDto> {
    const payload: FindProfileByUserIdPort = { id };
    const profile: UserProfile = await this.findProfileByUserIdService.execute(payload);

    return {
      uuid: profile.uuid,
      nickname: profile.nickname,
      points: profile.points,
      profilePictureName: profile.profilePictureName,
      deletedAt: profile.deletedAt,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
