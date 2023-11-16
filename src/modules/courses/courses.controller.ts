import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { AccessTokenGuard } from '@/common/guards/access-token.guard';
import { RolesGuard } from '@/common/guards/roles.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('courses')
// @UseGuards(AccessTokenGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // @Post()
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  // async createCourse(@Body() createCourseDto: CreateCourseDto) {
  //   return this.coursesService.createCourse(createCourseDto);
  // }
}
