import { Body, Controller, Get, Inject, Param, Post, Query, Headers } from '@nestjs/common';
import { SavePostUseCase } from '../services/usecases/save-post.usecase';
import { SavePostRequestDto } from '../dto/save-post-request.dto';
import { PostsDiTokens } from '../di/posts-tokens.di';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { SavePostResponseDto } from '../dto/save-post-response.dto';
import { FindPostByUuidUseCase } from '../services/usecases/find-post-by-uuid.usecase';
import { FindPostByUuidResponseDto } from '../dto/find-post-by-uuid-response.dto';
import { FindPostsInVicinityResponseDto } from '../dto/find-posts-in-vicinity-response.dto';
import { FindPostsInUserVicinityUseCase } from '../services/usecases/find-posts-in-user-vicinity.usecase';
import { FindPostsInBoundingBoxUseCase } from '../services/usecases/find-posts-in-bounding-box.usecase';
import { FindPostsInBoundingBoxResponseDto } from '../dto/find-posts-in-bounding-box-response.dto';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostsDiTokens.SavePostService)
    private readonly savePostService: SavePostUseCase,
    @Inject(PostsDiTokens.FindPostByUuidService)
    private readonly findPostByUuidService: FindPostByUuidUseCase,
    @Inject(PostsDiTokens.FindPostsInUserVicinityService)
    private readonly findPostsInUserVicinityService: FindPostsInUserVicinityUseCase,
    @Inject(PostsDiTokens.FindPostsInBoundingBoxService)
    private readonly findPostsInBoundingBoxService: FindPostsInBoundingBoxUseCase,
  ) {}

  @Post()
  async savePost(
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @UserData() user: JwtAuthGuardResponse,
    @Body() payload: SavePostRequestDto,
  ): Promise<SavePostResponseDto> {
    const post = await this.savePostService.execute({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      body: payload.body,
      location: payload.location,
      title: payload.title,
      userId: user.id,
      imageName: payload.imageName,
      videoName: payload.videoName,
    });

    return {
      post: {
        uuid: post.uuid,
        location: post.location,
        longitude: post.longitude,
        latitude: post.latitude,
        title: post.title,
        body: post.body,
        videoName: post.videoName,
        imageName: post.imageName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      },
    };
  }

  @Get('bounding-box')
  async findPostsInBoundingBox(
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @Query('box-length') boxLength: number,
    @Query('box-width') boxWidth: number,
  ): Promise<FindPostsInBoundingBoxResponseDto[]> {
    const posts = await this.findPostsInBoundingBoxService.execute({
      boxLength: boxLength,
      boxWidth: boxWidth,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    return posts.map((post) => ({
      post: {
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        location: post.location,
        latitude: post.latitude,
        longitude: post.longitude,
        imageName: post.imageName,
        videoName: post.videoName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      },
      creator: post.user
        ? {
            uuid: post.user.uuid,
            profile: post.user.profile
              ? {
                  uuid: post.user.profile.uuid,
                  nickname: post.user.profile.nickname,
                  profilePictureName: post.user.profile.profilePictureName,
                  points: post.user.profile.points,
                }
              : null,
          }
        : null,
    }));
  }

  @Get('vicinity')
  async findPostsInVicinity(
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @UserData() user: JwtAuthGuardResponse,
    @Query('page') page?: number,
  ): Promise<FindPostsInVicinityResponseDto[]> {
    const result = await this.findPostsInUserVicinityService.execute({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      userId: user.id,
      page: page || 1,
    });

    return result.map(({ post, approvalCount, commentCount, isApproved }) => ({
      post: {
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        location: post.location,
        latitude: post.latitude,
        longitude: post.longitude,
        imageName: post.imageName,
        videoName: post.videoName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
        isApproved: isApproved,
      },
      creator: post.user
        ? {
            uuid: post.user.uuid,
            profile: post.user.profile
              ? {
                  uuid: post.user.profile.uuid,
                  nickname: post.user.profile.nickname,
                  profilePictureName: post.user.profile.profilePictureName,
                  points: post.user.profile.points,
                }
              : null,
          }
        : null,
      approvalCount,
      commentCount,
    }));
  }

  @Get(':uuid')
  async findPostByUuid(
    @Param('uuid') uuid: string,
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @UserData() user: JwtAuthGuardResponse,
  ): Promise<FindPostByUuidResponseDto> {
    const result = await this.findPostByUuidService.execute({
      uuid: uuid,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      userId: user.id,
    });

    const { post, approvalCount, isApproved } = result;

    return {
      post: {
        uuid: post.uuid,
        title: post.title,
        body: post.body,
        location: post.location,
        latitude: post.latitude,
        longitude: post.longitude,
        imageName: post.imageName,
        videoName: post.videoName,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
        isApproved: isApproved,
      },
      creator: post.user
        ? {
            uuid: post.user.uuid,
            profile: post.user.profile
              ? {
                  uuid: post.user.profile.uuid,
                  nickname: post.user.profile.nickname,
                  profilePictureName: post.user.profile.profilePictureName,
                  points: post.user.profile.points,
                }
              : null,
          }
        : null,
      comments:
        post.comments?.map((comment) => ({
          uuid: comment.uuid,
          body: comment.body,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          deletedAt: comment.deletedAt,
          user: comment.user
            ? {
                uuid: comment.user.uuid,
                username: comment.user.username,
                profile: comment.user.profile
                  ? {
                      uuid: comment.user.profile.uuid,
                      nickname: comment.user.profile.nickname,
                      profilePictureName: comment.user.profile.profilePictureName,
                      points: comment.user.profile.points,
                    }
                  : null,
              }
            : null,
        })) || [],
      approvalCount,
    };
  }
}
