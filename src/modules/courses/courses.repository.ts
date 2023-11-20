import { PrismaService } from '@/database/prisma/prisma.service';
import {
  FindAllCoursesParams,
  UpdateCourseParams,
} from '@/shared/interfaces/course.interface';
import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async excludeCourseDetailFields(course: Course, excludedFields: string[]) {
    course.courseDetails = course.courseDetails.map((courseDetail) => {
      return Object.fromEntries(
        Object.entries(courseDetail).filter(
          ([field]) => !excludedFields.includes(field),
        ),
      );
    }) as Course['courseDetails'];

    return course;
  }

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({ data });
  }

  async findAll(params?: FindAllCoursesParams): Promise<Course[]> {
    return this.prisma.course.findMany({ ...params });
  }

  async findOne(
    courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
  ): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: courseWhereUniqueInput,
    });
  }

  async update(params: UpdateCourseParams): Promise<Course> {
    return this.prisma.course.update({ ...params });
  }

  async delete(where: Prisma.CourseWhereUniqueInput): Promise<Course> {
    return this.prisma.course.delete({ where });
  }
}
