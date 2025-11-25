import { Body, Controller, Inject, Param, Patch, Post } from '@nestjs/common';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { UpdateCommentRequestDto } from '../dto/update-comment-request.dto';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';
import { UpdateCommentResponseDto } from '../dto/update-comment-response.dto';
import { UpdateCommentUseCase } from '../services/usecases/update-comment.usecase';
import { PostsDiTokens } from '../di/posts-tokens.di';
import { SaveCommentRequestDto } from '../dto/save-comment-request.dto';
import { SaveCommentUsecase } from '../services/usecases/save-comment.usecase';
import { SaveCommentResponseDto } from '../dto/save-comment-response.dto';

@Controller('posts/')
export class CommentController {
  constructor(
    @Inject(PostsDiTokens.UpdateCommentService)
    private readonly updateCommentService: UpdateCommentUseCase,
    @Inject(PostsDiTokens.SaveCommentService)
    private readonly saveCommentService: SaveCommentUsecase,
  ) {}

  @Post(':postUuid/comments/')
  async saveComment(
    @Param('postUuid') postUuid: string,
    @UserData() user: JwtAuthGuardResponse,
    @Body() payload: SaveCommentRequestDto,
  ): Promise<SaveCommentResponseDto> {
    const comment = await this.saveCommentService.execute({
      userId: user.id,
      body: payload.body,
      postUuid: postUuid,
      userLatitude: payload.latitude,
      userLongitude: payload.longitude,
    });

    return {
      uuid: comment.uuid,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      deletedAt: comment.deletedAt,
    };
  }

  @Patch('comments/:commentUuid')
  async updateComment(
    @Param('commentUuid') commentUuid: string,
    @Body() payload: UpdateCommentRequestDto,
    @UserData() user: JwtAuthGuardResponse,
  ): Promise<UpdateCommentResponseDto> {
    const comment = await this.updateCommentService.execute({
      body: payload.body,
      longitude: payload.longitude,
      latitude: payload.latitude,
      userId: user.id,
      uuid: commentUuid,
    });

    return {
      uuid: comment.uuid,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      deletedAt: comment.deletedAt,
    };
  }
}
