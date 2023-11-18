import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, Prisma } from '@prisma/client';

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
    const course = await this.coursesRepository.findOne({
      name: createCourseDto.name,
    });

    if (course) {
      throw new ConflictException();
    }

    let uploadedFile;

    if (file) {
      uploadedFile = await this.cloudinaryService.uploadFile(file);
    }

    const createdCourse = await this.coursesRepository.create({
      ...createCourseDto,
      ...(uploadedFile && {
        thumbnail: {
          url: uploadedFile.secure_url,
          publicId: uploadedFile.public_id,
        },
      }),
    } as Prisma.CourseCreateInput);

    return createdCourse;
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      id: courseId,
    });

    if (!course) {
      throw new NotFoundException();
    }

    const courseWithSameName = await this.coursesRepository.findOne({
      name: updateCourseDto.name,
    });

    if (courseWithSameName && courseWithSameName.id !== course.id) {
      throw new ConflictException();
    }

    const uploadedFile = await this.cloudinaryService.uploadFile(file);

    if (course.thumbnail?.publicId) {
      await this.cloudinaryService.deleteFile(course.thumbnail.publicId);
    }

    const updatedCourse = await this.coursesRepository.update({
      where: { id: courseId },
      data: {
        ...updateCourseDto,
        ...(uploadedFile && {
          thumbnail: {
            url: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
          },
        }),
      } as Prisma.CourseUpdateInput,
    });

    return updatedCourse;
  }
}
