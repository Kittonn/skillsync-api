import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
    file: Express.Multer.File,
  ) {
    return {
      createCourseDto,
      file,
    };
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const course = (await this.coursesRepository.findOne({
      id: courseId,
    })) as any;

    console.log(course);

    console.log(course.courseDetails[0].links);

    // if (!course) {
    //   throw new NotFoundException(`Course with id ${courseId} not found`);
    // }

    // const uploadedFile = await this.cloudinaryService.uploadFile(file);

    // if (course.thumbnail?.publicId) {
    //   await this.cloudinaryService.deleteFile(course.thumbnail.publicId);
    // }

    // const updatedCourse = await this.coursesRepository.update({
    //   where: {
    //     id: courseId,
    //   },
    //   data: {
    //     ...updateCourseDto,
    //     courseDetails: {
    //       update: updateCourseDto.courseDetails.map((courseDetail) => ({
    //         where: {
    //           id: course.courseDetail.id,
    //         },
    //         data: {
    //           ...courseDetail,
    //           links: {
    //             update: courseDetail.links.map((link) => ({
    //               where: {
    //                 id: link.id,
    //               },
    //               data: link,
    //             })),
    //           },
    //         },
    //       })),
    //     },
    //     ...(uploadedFile && {
    //       thumbnail: {
    //         url: uploadedFile.secure_url,
    //         publicId: uploadedFile.public_id,
    //       },
    //     }),
    //   },
    // });

    return course;
  }
}
