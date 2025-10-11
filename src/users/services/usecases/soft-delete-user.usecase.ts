import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../soft-delete-user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    const success = await this.userService.softDelete(id);
    return { success };
  }
}
