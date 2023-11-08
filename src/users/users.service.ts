import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }
}
