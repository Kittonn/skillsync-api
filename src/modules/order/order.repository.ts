import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schema/order.schema';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';
import { generateLast12MonthsData } from '@/shared/utils/analytics.util';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async create(order: Object): Promise<Order> {
    return this.orderModel.create(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findOne(filter: FilterQuery<Order>): Promise<Order> {
    return this.orderModel.findOne(filter);
  }

  async find(
    filter: FilterQuery<Order>,
    options?: QueryOptions,
  ): Promise<Order[]> {
    return this.orderModel.find(filter, null, options);
  }

  async update(
    filter: FilterQuery<Order>,
    data: Object,
    options = { new: true },
  ): Promise<Order> {
    return this.orderModel.findOneAndUpdate(filter, data, options);
  }

  async delete(filter: FilterQuery<Order>): Promise<Order> {
    return this.orderModel.findOneAndDelete(filter);
  }

  async getAnalytics(): Promise<Last12MonthsData> {
    return await generateLast12MonthsData(this.orderModel);
  }
}
