import { Controller, HttpCode, Inject, Post, Headers, Param, Delete } from '@nestjs/common';
import { SaveApprovalUseCase } from '../services/usecases/save-approval.usecase';
import { DeleteApprovalUseCase } from '../services/usecases/delete-approval.usecase';
import { PostsDiTokens } from '../di/posts-tokens.di';
import { UserData } from 'src/auth/decorators/user-data.decorator';
import { JwtAuthGuardResponse } from 'src/auth/interfaces/jwt-auth-guard-response.interface';

@Controller('posts')
export class ApprovalController {
  constructor(
    @Inject(PostsDiTokens.SaveApprovalService)
    private readonly saveApprovalService: SaveApprovalUseCase,
    @Inject(PostsDiTokens.DeleteApprovalService)
    private readonly deleteApprovalService: DeleteApprovalUseCase,
  ) {}

  @HttpCode(204)
  @Post(':uuid/approvals')
  async saveApproval(
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @UserData() user: JwtAuthGuardResponse,
    @Param('uuid') postUuid: string,
  ): Promise<void> {
    await this.saveApprovalService.execute({
      postUuid: postUuid,
      userId: user.id,
      userLatitude: parseFloat(latitude),
      userLongitude: parseFloat(longitude),
    });
  }

  @HttpCode(204)
  @Delete(':uuid/approvals')
  async deleteApproval(
    @Headers('latitude') latitude: string,
    @Headers('longitude') longitude: string,
    @UserData() user: JwtAuthGuardResponse,
    @Param('uuid') postUuid: string,
  ): Promise<void> {
    await this.deleteApprovalService.execute({
      postUuid: postUuid,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      userId: user.id,
    });
  }
}
