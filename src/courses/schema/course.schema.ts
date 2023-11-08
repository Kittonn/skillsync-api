import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Review } from './review.schema';
import { CourseDetail } from './course-detail.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop()
  estimatedPrice: number;

  @Prop(raw({ url: { type: String }, public_id: { type: String } }))
  thumbnail: Record<string, any>;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  demoUrl: string;

  @Prop({ required: true })
  benefits: { title: string }[];

  @Prop({ required: true })
  prerequisites: { title: string }[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    default: [],
  })
  reviews: Review[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseDetail' }],
    default: [],
  })
  courseDetail: CourseDetail[];

  @Prop({ default: 0, min: 0, max: 5 })
  ratings: number;

  @Prop({ default: 0 })
  purchased: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
