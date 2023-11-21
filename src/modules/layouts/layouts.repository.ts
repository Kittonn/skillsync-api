import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Layout } from './schema/layout.schema';
import { FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

@Injectable()
export class LayoutsRepository {
  constructor(
    @InjectModel(Layout.name) private readonly layoutModel: Model<Layout>,
  ) {}

  async create(layout: Object): Promise<Layout> {
    return this.layoutModel.create(layout);
  }

  async findAll(): Promise<Layout[]> {
    return this.layoutModel.find();
  }

  async find(
    filter: FilterQuery<Layout>,
    options?: QueryOptions,
  ): Promise<Layout[]> {
    return this.layoutModel.find(filter, null, options);
  }

  async findOne(filter: FilterQuery<Layout>): Promise<Layout> {
    return this.layoutModel.findOne(filter);
  }

  async update(
    filter: FilterQuery<Layout>,
    data: UpdateQuery<Layout>,
    options = { new: true },
  ): Promise<Layout> {
    return this.layoutModel.findOneAndUpdate(filter, data, options);
  }

  async delete(filter: FilterQuery<Layout>): Promise<Layout> {
    return this.layoutModel.findOneAndDelete(filter);
  }
}
