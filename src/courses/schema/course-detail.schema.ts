import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Link } from './link.schema';
import { Comment } from './comment.schema';

export type CourseDetailDocument = HydratedDocument<CourseDetail>;

@Schema()
export class CourseDetail {
  @Prop()
  videoUrl: string;

  @Prop()
  videoThumbnail: string;

  @Prop()
  title: string;

  @Prop()
  videoSection: string;

  @Prop()
  description: string;

  @Prop()
  videoLength: number;

  @Prop()
  videoPlayer: string;

  @Prop()
  suggestion: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }],
    default: [],
  })
  links: Link[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  questions: Comment[];
}

export const CourseDetailSchema = SchemaFactory.createForClass(CourseDetail);
