import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { Link, LinkSchema } from './schema/link.schema';
import { Review, ReviewSchema } from './schema/review.schema';
import { Course, CourseSchema } from './schema/course.schema';
import {
  CourseDetail,
  CourseDetailSchema,
} from './schema/course-detail.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Link.name, schema: LinkSchema },
      { name: CourseDetail.name, schema: CourseDetailSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
