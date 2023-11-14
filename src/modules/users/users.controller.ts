import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(AccessTokenGuard)
  async getUserInfo(@GetUser('id') userId: string) {
    return this.usersService.getUserInfo(userId);
  }
}
