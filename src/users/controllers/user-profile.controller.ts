import { Controller, Inject, Get } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UsersDiTokens } from '../di/users-tokens.di';
import { FindProfileByUserIdPort, FindProfileByUserIdUseCase } from '../services/usecases/find-profile-by-user.id.usecase';
import { FindProfileByUserIdResponseDto } from '../dto/find-profile-by-user-id-response.dto';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(UsersDiTokens.FindProfileByUserIdService)
    private readonly findProfileByUserIdService: FindProfileByUserIdUseCase,
  ) {}

  @Get('me')
  async findByUserId(@UserData() user: JwtAuthGuardResponse): Promise<FindProfileByUserIdResponseDto> {
    const payload: FindProfileByUserIdPort = { id: user.id };
    const profile: UserProfile = await this.findProfileByUserIdService.execute(payload);

    return {
      uuid: profile.uuid,
      nickname: profile.nickname,
      points: profile.points,
      profilePictureName: profile.profilePictureName,
      posts: profile.user.posts.map((post) => ({
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        latitude: post.latitude,
        longitude: post.longitude,
        createdAt: post.createdAt,
      })),
      comments: profile.user.comments.map((comment) => ({
        uuid: comment.uuid,
        body: comment.body,
        createdAt: comment.createdAt,
      })),
      deletedAt: profile.deletedAt,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }
}
