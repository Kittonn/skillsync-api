import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { CloudinaryService } from '@/database/cloudinary/cloudinary.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './schema/course.schema';
import { User } from '../users/schema/user.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';

@Injectable()
export class CoursesService {
  constructor(
    private readonly coursesRepository: CoursesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getCourseById(courseId: string): Promise<Course> {
    const course = await this.coursesRepository.findOne(
      { _id: courseId },
      '-courseDetails.videoUrl -courseDetails.suggestion -courseDetails.links',
    );

    if (!course) {
      throw new NotFoundException();
    }
    return course;
  }

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.coursesRepository.findAll(
      '-courseDetails.videoUrl -courseDetails.suggestion -courseDetails.links',
    );

    return courses;
  }

  async getCourseContentById(courseId: string, user: User) {
    if (!user.courses) {
      throw new BadRequestException('User does not have any courses');
    }

    const userExistingCourse = user?.courses.find(
      (course) => course.toString() === courseId,
    );

    if (!userExistingCourse) {
      throw new ForbiddenException('User does not have access to this course');
    }

    const existingCourse = await this.coursesRepository.findOne({
      _id: courseId,
    });

    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    return existingCourse.courseDetails;
  }

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
    });

    return createdCourse;
  }

  async updateCourse(
    courseId: string,
    updateCourseDto: UpdateCourseDto,
    file: Express.Multer.File,
  ): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      _id: courseId,
    });

    if (!course) {
      throw new NotFoundException();
    }

    const courseWithSameName = await this.coursesRepository.findOne({
      name: updateCourseDto.name,
    });

    if (
      courseWithSameName &&
      courseWithSameName._id.toString() !== course._id.toString()
    ) {
      throw new ConflictException();
    }

    const uploadedFile = await this.cloudinaryService.uploadFile(file);

    if (course.thumbnail?.publicId) {
      await this.cloudinaryService.deleteFile(course.thumbnail.publicId);
    }

    const updatedCourse = await this.coursesRepository.update(
      { _id: courseId },
      {
        ...updateCourseDto,
        ...(uploadedFile && {
          thumbnail: {
            url: uploadedFile.secure_url,
            publicId: uploadedFile.public_id,
          },
        }),
      },
    );

    return updatedCourse;
  }

  async createReview(
    courseId: string,
    user: User,
    createReviewDto: CreateReviewDto,
  ) {
    const course = await this.coursesRepository.findOne({ _id: courseId });

    if (!course) {
      throw new NotFoundException();
    }

    const userExistingCourse = user?.courses.find(
      (course) => course.toString() === courseId,
    );

    if (!userExistingCourse) {
      throw new ForbiddenException('User does not have access to this course');
    }

    let rating;
    if (course) {
      rating =
        (course.rating + createReviewDto.rating) / (course.reviews.length + 1);
    }

    const updatedCourse = await this.coursesRepository.update(
      { _id: courseId },
      {
        $push: {
          reviews: {
            ...createReviewDto,
            user: user._id,
          },
        },
        rating,
      },
    );

    return updatedCourse;
  }

  async addReviewReply(
    courseId: string,
    user: User,
    createReplyReviewDto: CreateReplyReviewDto,
  ) {
    const course = await this.coursesRepository.findOne({ _id: courseId });

    if (!course) {
      throw new NotFoundException();
    }

    const review = course.reviews.find(
      (review) => review._id.toString() === createReplyReviewDto.reviewId,
    );

    if (!review) {
      throw new NotFoundException();
    }

    const reviewReply = {
      ...createReplyReviewDto,
      user: user._id,
    };

    review.reviewReplies.push(reviewReply as never);

    const updatedCourse = await this.coursesRepository.update(
      { _id: courseId },
      {
        reviews: course.reviews,
      },
    );

    return updatedCourse;
  }
}
