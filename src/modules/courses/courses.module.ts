import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { RedisModule } from '@/database/redis/redis.module';
import { CloudinaryModule } from '@/database/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/course.schema';
import { NodeMailerModule } from '../node-mailer/node-mailer.module';

@Module({
  imports: [
    RedisModule,
    CloudinaryModule,
    NodeMailerModule,
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
})
export class CoursesModule {}
