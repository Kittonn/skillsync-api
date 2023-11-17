import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';
import { FileValidationPipe } from '@/common/pipes/file-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
// @UseGuards(AccessTokenGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
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
  ) {
    return this.coursesService.createCourse(createCourseDto, file);
  }
}
