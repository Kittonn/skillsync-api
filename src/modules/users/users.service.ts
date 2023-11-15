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

  async getUserInfo(userId: string) {
    const user = JSON.parse(await this.redisService.get(userId));

    return this.usersRepository.exclude(user, ['refreshToken', 'password']);
  }

  async updateUserInfo(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update({
      where: { id: userId },
      data: updateUserDto,
    });

    await this.redisService.set(userId, JSON.stringify(user));

    return this.usersRepository.exclude(user, ['refreshToken', 'password']);
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

    return this.usersRepository.exclude(updatedUser, [
      'refreshToken',
      'password',
    ]);
  }
}
