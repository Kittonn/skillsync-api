import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { Last12MonthsData } from '@/shared/interfaces/analytics.interface';
import { generateLast12MonthsData } from '@/shared/utils/analytics.util';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async create(course: Object): Promise<Course> {
    return this.courseModel.create(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findOne(
    filter: FilterQuery<Course>,
    options?: QueryOptions,
  ): Promise<Course> {
    return this.courseModel.findOne(filter, null, options);
  }

  async find(
    filter: FilterQuery<Course>,
    options?: QueryOptions,
  ): Promise<Course[]> {
    return this.courseModel.find(filter, null, options);
  }

  async update(
    filter: FilterQuery<Course>,
    data: Object,
    options = { new: true },
  ): Promise<Course> {
    return this.courseModel.findOneAndUpdate(filter, data, options);
  }

  async delete(filter: FilterQuery<Course>): Promise<Course> {
    return this.courseModel.findOneAndDelete(filter);
  }

  async getAnalytics(): Promise<Last12MonthsData> {
    return await generateLast12MonthsData(this.courseModel);
  }
}
