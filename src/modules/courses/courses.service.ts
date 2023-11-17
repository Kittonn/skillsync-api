import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';

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
    let uploadedFile;
    if (file) {
      uploadedFile = await this.cloudinaryService.uploadFile(file);
    }

    const course = await this.coursesRepository.create({
      ...createCourseDto,
      courseDetails: {
        create: createCourseDto.courseDetails.map((courseDetail) => ({
          ...courseDetail,
          links: {
            create: courseDetail.links,
          },
        })),
      },
      thumbnail: {
        publicId: uploadedFile?.public_id,
        url: uploadedFile?.url,
      },
    });

    return course; 
  }

  async updateCourse() {
    return;
  }
}
