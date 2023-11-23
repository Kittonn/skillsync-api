import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@/common/pipes/file-validation.pipe';
import { User } from './schema/user.schema';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/shared/enums/role.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getUserInfo(@GetUser('_id') userId: string): Promise<User> {
    return this.usersService.getUserInfo(userId);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Put()
  async updateUserInfo(
    @GetUser('_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserInfo(userId, updateUserDto);
  }

  @Put('/change-password')
  async updatePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    return this.usersService.updatePassword(user, changePasswordDto);
  }

  @Put('/change-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        fileType: /^image\/(png|jpeg|jpg|webp)$/,
      }),
    )
    file: Express.Multer.File,
    @GetUser('_id') userId: string,
  ): Promise<User> {
    return this.usersService.updateAvatar(file, userId);
  }

  @Put('/update-role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<User> {
    return this.usersService.updateRole(updateRoleDto);
  }

  @Delete('/:userId')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUser(@Param('userId') userId: string): Promise<string> {
    return this.usersService.deleteUser(userId);
  }
}
