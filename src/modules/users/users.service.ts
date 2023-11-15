import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from '@/database/redis/redis.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '@prisma/client';
import { compare, hash } from '@/shared/utils/hash';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly redisService: RedisService,
  ) {}

  async getUserInfo(userId: string): Promise<User> {
    const user = JSON.parse(await this.redisService.get(userId));

    const { password, refreshToken, ...userInfo } = user;

    return userInfo as User;
  }

  async updateUserInfo(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.update({
      where: { id: userId },
      data: updateUserDto,
    });

    await this.redisService.set(userId, JSON.stringify(user));

    const { password, refreshToken, ...userInfo } = user;
    return userInfo as User;
  }

  async updatePassword(user: User, changePasswordDto: ChangePasswordDto) {
    const isPasswordMatch = await compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await hash(changePasswordDto.newPassword);

    const updatedUser = await this.usersRepository.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.redisService.set(user.id, JSON.stringify(updatedUser));

    const { password, refreshToken, ...userInfo } = updatedUser;
    return userInfo as User;
  }
}
