import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';

@Injectable()
export class CoursesService {
  constructor(private readonly coursesRepository: CoursesRepository) {}

  // async createCourse(createCourseDto: CreateCourseDto) {
  //   const { benefits, prerequisites, courseDetails } = createCourseDto;

  //   const course = await this.coursesRepository.create({
  //     ...createCourseDto,
  //     benefits: { create: benefits },
  //     prerequisites: { create: prerequisites },
  //     courseDetails: {
  //       create: courseDetails.map((courseDetail) => ({
  //         ...courseDetail,
  //         links: { create: courseDetail.links },
  //       })),
  //     },
  //   });

  //   return course;
  // }
}


