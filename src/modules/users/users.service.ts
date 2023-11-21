import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { RedisService } from '@/database/redis/redis.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compare, hash } from '@/shared/utils/encrypt';
import { User } from './schema/user.schema';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly redisService: RedisService,
    private readonly cloudinaryService: CloudinaryService,
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
    const user = await this.usersRepository.update(
      { _id: userId },
      updateUserDto,
    );

    await this.redisService.set(userId, JSON.stringify(user));

    const { password, refreshToken, ...userInfo } = user['_doc'];
    return userInfo as User;
  }

  async updatePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
    const isPasswordMatch = await compare(
      changePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const hashedPassword = await hash(changePasswordDto.newPassword);

    const updatedUser = await this.usersRepository.update(
      { _id: user._id },
      { password: hashedPassword },
    );

    await this.redisService.set(user._id, JSON.stringify(updatedUser));

    const { password, refreshToken, ...userInfo } = updatedUser['_doc'];
    return userInfo as User;
  }

  async updateAvatar(file: Express.Multer.File, userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id: userId });

    const uploadedFile = await this.cloudinaryService.uploadFile(file);
    const avatarData = {
      publicId: uploadedFile.public_id,
      url: uploadedFile.secure_url,
    };

    if (user?.avatar) {
      await this.cloudinaryService.deleteFile(user.avatar.publicId);
    }

    const updatedUser = await this.usersRepository.update(
      { _id: userId },
      { avatar: avatarData },
    );

    await this.redisService.set(userId, JSON.stringify(updatedUser));
    const { password, refreshToken, ...userInfo } = updatedUser['_doc'];
    return userInfo as User;
  }
}
