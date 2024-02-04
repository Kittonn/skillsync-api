import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { FilterQuery, Model, UpdateQuery, QueryOptions } from 'mongoose';
import { generateLast12MonthsData } from '@/shared/utils/analytics.util';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: Object): Promise<User> {
    return await this.userModel.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(filter: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(filter);
  }

  async find(
    filter: FilterQuery<User>,
    options?: QueryOptions,
  ): Promise<User[]> {
    return await this.userModel.find(filter, null, options);
  }

  async update(
    filter: FilterQuery<User>,
    data: UpdateQuery<User>,
    options = { new: true },
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(filter, data, options);
  }

  async delete(filter: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOneAndDelete(filter);
  }

  async getAnalytics(): Promise<Last12MonthsData> {
    return await generateLast12MonthsData(this.userModel);
  }
}
