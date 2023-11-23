import { Level } from '@/shared/enums/level.enum';
import { Thumbnail } from '@/shared/interfaces/course.interface';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Benefit, BenefitSchema } from './benefit.schema';
import { Prerequisite, PrerequisiteSchema } from './prerequisite.schema';
import { CourseDetail, CourseDetailSchema } from './course-detail.schema';
import { Review, ReviewSchema } from './review.schema';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  estimatedPrice: number;

  @Prop(raw({ url: String, publicId: String }))
  thumbnail: Thumbnail;

  @Prop()
  tags: string;

  @Prop()
  level: Level;

  @Prop()
  demoUrl: string;

  @Prop({ type: [BenefitSchema] })
  benefits: Benefit[];

  @Prop({ type: [PrerequisiteSchema] })
  prerequisites: Prerequisite[];

  @Prop({ type: [CourseDetailSchema] })
  courseDetails: CourseDetail[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  purchased: number;

  @Prop({ type: [ReviewSchema] })
  reviews: Review[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
