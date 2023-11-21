import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { FileValidationPipe } from '@/common/pipes/file-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetUser } from '@/common/decorators/get-user.decorator';
import { Role } from '@/shared/enums/role.enum';
import { Course } from './schema/course.schema';
import { User } from '../users/schema/user.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReplyReviewDto } from './dto/create-reply-review.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') courseId: string): Promise<Course> {
    return this.coursesService.getCourseById(courseId);
  }

  @Get('/content/:id')
  @UseGuards(AccessTokenGuard)
  async getCourseContentById(
    @Param('id') courseId: string,
    @GetUser() user: User,
  ) {
    return this.coursesService.getCourseContentById(courseId, user);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        fileType: /^image\/(png|jpeg|jpg|webp)$/,
      }),
    )
    file: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto, file);
  }

  @Put('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateCourse(
    @UploadedFile(
      new FileValidationPipe({
        maxSize: 10 * 1024 * 1024,
        fileType: /^image\/(png|jpeg|jpg|webp)$/,
      }),
    )
    file: Express.Multer.File,
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('id') courseId: string,
  ): Promise<Course> {
    return this.coursesService.updateCourse(courseId, updateCourseDto, file);
  }

  @Post('/review/:id')
  @UseGuards(AccessTokenGuard)
  async createReview(
    @Param('id') courseId: string,
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<Course> {
    return this.coursesService.createReview(courseId, user, createReviewDto);
  }

  // add review reply
  @Post('/review/:id/reply')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async addReviewReply(
    @Param('id') courseId: string,
    @Body() createReplyReviewDto: CreateReplyReviewDto,
    @GetUser() user: User,
  ): Promise<Course> {
    return this.coursesService.addReviewReply(courseId, user, createReplyReviewDto);
  }
}
