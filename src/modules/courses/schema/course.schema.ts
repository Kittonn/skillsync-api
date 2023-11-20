import { Level } from '@/shared/enums/level.enum';
import {
  Benefit,
  CourseDetail,
  Prerequisite,
  Thumbnail,
} from '@/shared/interfaces/course.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  estimatedPrice: number;

  @Prop()
  thumbnail: Thumbnail;

  @Prop()
  tags: string;

  @Prop()
  level: Level;

  @Prop()
  demoUrl: string;

  @Prop()
  benefits: Benefit[];

  @Prop()
  prerequisites: Prerequisite[];

  @Prop()
  courseDetails: CourseDetail[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  purchased: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
