import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Notification } from './schema/notification.schema';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async create(notification: Object): Promise<Notification> {
    return this.notificationModel.create(notification);
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find();
  }

  async findOne(filter: FilterQuery<Notification>): Promise<Notification> {
    return this.notificationModel.findOne(filter);
  }

  async find(
    filter: FilterQuery<Notification>,
    options?: QueryOptions,
  ): Promise<Notification[]> {
    return this.notificationModel.find(filter, null, options);
  }

  async update(
    filter: FilterQuery<Notification>,
    data: Object,
    options = { new: true },
  ): Promise<Notification> {
    return this.notificationModel.findOneAndUpdate(filter, data, options);
  }

  async delete(filter: FilterQuery<Notification>): Promise<Notification> {
    return this.notificationModel.findOneAndDelete(filter);
  }
}
