import { Controller, Inject, Get, Patch, Body, Param } from '@nestjs/common';
import { UserProfile } from '../entities/user-profile.entity';
import { UsersDiTokens } from '../di/users-tokens.di';
import { FindProfileByUserIdPort, FindProfileByUserIdUseCase } from '../services/usecases/find-profile-by-user.id.usecase';
import { FindProfileByUserIdResponseDto } from '../dto/find-profile-by-user-id-response.dto';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { UpdateProfileUseCase } from '../services/usecases/update-user-profile.usecase';
import { UpdateProfileRequestDto } from '../dto/update-profile-request.dto';
import { UpdateProfileResponseDto } from '../dto/update-profile-response.dto';
import { FindProfileByUuidResponseDto } from '../dto/find-profile-by-uuid.response.dto';
import { FindProfileByUuidUseCase } from '../services/usecases/find-profile-by-uuid.usecase';

@Controller('profiles')
export class ProfileController {
  constructor(
    @Inject(UsersDiTokens.FindProfileByUserIdService)
    private readonly findProfileByUserIdService: FindProfileByUserIdUseCase,
    @Inject(UsersDiTokens.UpdateProfileService)
    private readonly updateProfileService: UpdateProfileUseCase,
    @Inject(UsersDiTokens.FindProfileByUuidService)
    private readonly findProfileByUuidService: FindProfileByUuidUseCase,
  ) {}

  @Get('me')
  async findByUserId(@UserData() user: JwtAuthGuardResponse): Promise<FindProfileByUserIdResponseDto> {
    const payload: FindProfileByUserIdPort = { id: user.id };
    const profile: UserProfile = await this.findProfileByUserIdService.execute(payload);

    return {
      profile: {
        uuid: profile.uuid,
        nickname: profile.nickname,
        points: profile.points,
        profilePictureName: profile.profilePictureName,
      },
      posts:
        profile.user?.posts?.map((post) => ({
          uuid: post.uuid,
          title: post.title,
          body: post.body,
          location: post.location,
          latitude: post.latitude,
          longitude: post.longitude,
          createdAt: post.createdAt,
        })) || [],
      comments:
        profile.user?.comments?.map((comment) => ({
          uuid: comment.uuid,
          body: comment.body,
          createdAt: comment.createdAt,
        })) || [],
      deletedAt: profile.deletedAt,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  @Get(':uuid')
  async findByUuid(@Param('uuid') uuid: string): Promise<FindProfileByUuidResponseDto> {
    const profile = await this.findProfileByUuidService.execute({
      uuid: uuid,
    });

    return {
      profile: {
        uuid: profile.uuid,
        nickname: profile.nickname,
        points: profile.points,
        profilePictureName: profile.profilePictureName,
        deletedAt: profile.deletedAt,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      posts:
        profile.user?.posts?.map((post) => ({
          uuid: post.uuid,
          title: post.title,
          body: post.body,
          location: post.location,
          latitude: post.latitude,
          longitude: post.longitude,
          createdAt: post.createdAt,
        })) || [],
      comments:
        profile.user?.comments?.map((comment) => ({
          uuid: comment.uuid,
          body: comment.body,
          createdAt: comment.createdAt,
        })) || [],
    };
  }

  @Patch('me')
  async updateProfile(@UserData() user: JwtAuthGuardResponse, @Body() payload: UpdateProfileRequestDto): Promise<UpdateProfileResponseDto> {
    const profile = await this.updateProfileService.execute({
      userId: user.id,
      nickname: payload.nickname,
      profilePictureName: payload.profilePictureName,
    });

    return {
      profile: {
        uuid: profile.uuid,
        points: profile.points,
        nickname: profile.nickname,
        profilePictureName: profile.profilePictureName,
      },
    };
  }
}
