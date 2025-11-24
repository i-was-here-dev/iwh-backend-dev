import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { SavePostUseCase } from '../services/usecases/save-post.usecase';
import { SavePostRequestDto } from '../dto/save-post-request.dto';
import { PostsDiTokens } from '../di/posts-tokens.di';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { SavePostResponseDto } from '../dto/save-post-response.dto';
import { SaveApprovalRequestDto } from '../dto/save-approval-request.dto';
import { SaveApprovalUseCase } from '../services/usecases/save-approval.usecase';

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostsDiTokens.SavePostService)
    private readonly savePostService: SavePostUseCase,
    @Inject(PostsDiTokens.SaveApprovalService)
    private readonly saveApprovalService: SaveApprovalUseCase,
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
}
