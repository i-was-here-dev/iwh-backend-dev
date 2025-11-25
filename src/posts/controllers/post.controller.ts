import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Post, Query } from '@nestjs/common';
import { SavePostUseCase } from '../services/usecases/save-post.usecase';
import { SavePostRequestDto } from '../dto/save-post-request.dto';
import { PostsDiTokens } from '../di/posts-tokens.di';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { SavePostResponseDto } from '../dto/save-post-response.dto';
import { SaveApprovalRequestDto } from '../dto/save-approval-request.dto';
import { SaveApprovalUseCase } from '../services/usecases/save-approval.usecase';
import { DeleteApprovalUseCase } from '../services/usecases/delete-approval.usecase';
import { DeleteApprovalRequestDto } from '../dto/delete-approval-request.dto';
import { FindPostByUuidUseCase } from '../services/usecases/find-post-by-uuid.usecase';
import { BaseLocationDto } from '../dto/abstracts/base-location.abstract';
import { FindPostByUuidResponseDto } from '../dto/find-post-by-uuid-response.dto';
import { FindPostsInVicinityResponseDto } from '../dto/find-posts-in-vicinity-response.dto';
import { FindPostsInUserVicinityUseCase } from '../services/usecases/find-posts-in-user-vicinity.usecase';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostsDiTokens.SavePostService)
    private readonly savePostService: SavePostUseCase,
    @Inject(PostsDiTokens.SaveApprovalService)
    private readonly saveApprovalService: SaveApprovalUseCase,
    @Inject(PostsDiTokens.DeleteApprovalService)
    private readonly deleteApprovalService: DeleteApprovalUseCase,
    @Inject(PostsDiTokens.FindPostByUuidService)
    private readonly findPostByUuidService: FindPostByUuidUseCase,
    @Inject(PostsDiTokens.FindPostsInUserVicinityService)
    private readonly findPostsInUserVicinityService: FindPostsInUserVicinityUseCase,
  ) {}

  @Post()
  async savePost(@UserData() user: JwtAuthGuardResponse, @Body() payload: SavePostRequestDto): Promise<SavePostResponseDto> {
    const post = await this.savePostService.execute({
      latitude: payload.latitude,
      longitude: payload.longitude,
      body: payload.body,
      title: payload.title,
      userId: user.id,
      imageName: payload.imageName,
      videoName: payload.videoName,
    });

    return {
      uuid: post.uuid,
      longitude: post.longitude,
      latitude: post.latitude,
      title: post.title,
      body: post.body,
      videoName: post.videoName,
      imageName: post.imageName,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
    };
  }

  @Get(':uuid')
  async findPostByUuid(@Param('uuid') uuid: string, @Body() payload: BaseLocationDto): Promise<FindPostByUuidResponseDto> {
    const result = await this.findPostByUuidService.execute({
      uuid: uuid,
      latitude: payload.latitude,
      longitude: payload.longitude,
    });

    const { post, approvalCount } = result;

    return {
      post: {
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        latitude: post.latitude,
        longitude: post.longitude,
        imageName: post.imageName,
        videoName: post.videoName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      },
      creator: {
        uuid: post.user.uuid,
        username: post.user.username,
        profile: {
          uuid: post.user.profile.uuid,
          nickname: post.user.profile.nickname,
          profilePictureName: post.user.profile.profilePictureName,
          points: post.user.profile.points,
        },
      },
      comments: post.comments.map((comment) => ({
        uuid: comment.uuid,
        body: comment.body,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        deletedAt: comment.deletedAt,
        user: {
          uuid: comment.user.uuid,
          username: comment.user.username,
          profile: {
            uuid: comment.user.profile.uuid,
            nickname: comment.user.profile.nickname,
            profilePictureName: comment.user.profile.profilePictureName,
            points: comment.user.profile.points,
          },
        },
      })),
      approvalCount,
    };
  }

  @HttpCode(204)
  @Post(':uuid/approvals')
  async saveApproval(
    @UserData() user: JwtAuthGuardResponse,
    @Param('uuid') postUuid: string,
    @Body() payload: SaveApprovalRequestDto,
  ): Promise<void> {
    await this.saveApprovalService.execute({
      postUuid: postUuid,
      userId: user.id,
      userLatitude: payload.latitude,
      userLongitude: payload.longitude,
    });
  }

  @HttpCode(204)
  @Delete(':uuid/approvals')
  async deleteApproval(
    @UserData() user: JwtAuthGuardResponse,
    @Param('uuid') postUuid: string,
    @Body() payload: DeleteApprovalRequestDto,
  ): Promise<void> {
    await this.deleteApprovalService.execute({
      postUuid: postUuid,
      latitude: payload.latitude,
      longitude: payload.longitude,
      userId: user.id,
    });
  }

  @Get('vicinity')
  async findPostsInVicinity(@Body() payload: BaseLocationDto, @Query('page') page?: number): Promise<FindPostsInVicinityResponseDto[]> {
    const result = await this.findPostsInUserVicinityService.execute({
      latitude: payload.latitude,
      longitude: payload.longitude,
      page: page || 1,
    });

    return result.map(({ post, approvalCount, commentCount }) => ({
      post: {
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        latitude: post.latitude,
        longitude: post.longitude,
        imageName: post.imageName,
        videoName: post.videoName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      },
      creator: {
        uuid: post.user.uuid,
        username: post.user.username,
        profile: {
          uuid: post.user.profile.uuid,
          nickname: post.user.profile.nickname,
          profilePictureName: post.user.profile.profilePictureName,
          points: post.user.profile.points,
        },
      },
      approvalCount,
      commentCount,
    }));
  }
}
