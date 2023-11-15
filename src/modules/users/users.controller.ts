import { Body, Controller, Get, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(AccessTokenGuard) 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getUserInfo(@GetUser('id') userId: string) {
    return this.usersService.getUserInfo(userId);
  }
  
  @Put()
  async updateUserInfo(
    @GetUser('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserInfo(userId, updateUserDto);
  }

  @Put('/change-password')
  async updatePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.updatePassword(user, changePasswordDto);
  }
}
