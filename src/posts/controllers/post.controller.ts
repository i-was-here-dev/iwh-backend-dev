import { Body, Controller, Delete, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
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

@Controller('posts')
export class PostController {
  constructor(
    @Inject(PostsDiTokens.SavePostService)
    private readonly savePostService: SavePostUseCase,
    @Inject(PostsDiTokens.SaveApprovalService)
    private readonly saveApprovalService: SaveApprovalUseCase,
    @Inject(PostsDiTokens.DeleteApprovalService)
    private readonly deleteApprovalService: DeleteApprovalUseCase,
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
}
