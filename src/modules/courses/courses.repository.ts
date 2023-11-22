import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { FilterQuery, Model, QueryOptions } from 'mongoose';

@Injectable()
export class CoursesRepository {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}

  async create(course: Object): Promise<Course> {
    return this.courseModel.create(course);
  }

  async findAll(
    select?: string | any | null,
    populate?: string | any | null,
  ): Promise<Course[]> {
    if (populate) {
      return this.courseModel
        .find()
        .select(select)
        .populate(populate, '-password -refreshToken');
    }
    return this.courseModel.find().select(select);
  }

  async findOne(
    filter: FilterQuery<Course>,
    select?: string | any | null,
    populate?: string | any | null,
  ): Promise<Course> {
    if (populate) {
      return this.courseModel
        .findOne(filter)
        .select(select)
        .populate(populate, '-password -refreshToken');
    }

    return this.courseModel.findOne(filter).select(select);
  }

  async find(
    filter: FilterQuery<Course>,
    options?: QueryOptions,
  ): Promise<Course[]> {
    return this.courseModel.find(filter, null, options)
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
}
