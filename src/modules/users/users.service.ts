import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { compare, hash } from '@/shared/utils/encrypt.util';
import { User } from './schema/user.schema';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getUserInfo(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ _id: userId });

    const { password, refreshToken, ...userInfo } = user['_doc'];

    return userInfo as User;
  }

  async getAllUsers() {
    return await this.usersRepository.find({}, { sort: { createdAt: -1 } });
  }

  async updateUserInfo(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.update(
      { _id: userId },
      updateUserDto,
    );

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

    const { password, refreshToken, ...userInfo } = updatedUser['_doc'];
    return userInfo as User;
  }

  async updateAvatar(file: Express.Multer.File, userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id: userId });

    const uploadedFile = await this.cloudinaryService.uploadFile(
      file,
      'avatar',
    );
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

    const { password, refreshToken, ...userInfo } = updatedUser['_doc'];
    return userInfo as User;
  }

  async updateRole(updateRoleDto: UpdateRoleDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      _id: updateRoleDto.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.usersRepository.update(
      { _id: updateRoleDto.userId },
      { role: updateRoleDto.role },
    );

    const { password, refreshToken, ...userInfo } = updatedUser['_doc'];
    return userInfo as User;
  }

  async deleteUser(userId: string): Promise<string> {
    const user = await this.usersRepository.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.delete({ _id: userId });

    return 'User deleted';
  }
}
