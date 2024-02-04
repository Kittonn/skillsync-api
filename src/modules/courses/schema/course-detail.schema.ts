import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Link, LinkSchema } from './link.schema';
import { Document } from 'mongoose';
import { Comment, CommentSchema } from './comment.schema';

@Schema()
export class CourseDetail extends Document {
  @Prop()
  videoUrl: string;

  @Prop()
  title: string;

  @Prop()
  videoSection: string;

  @Prop()
  desciption: string;

  @Prop()
  videoLength: number;

  @Prop()
  videoPlayer: string;

  @Prop({ type: [LinkSchema] })
  links: Link[];

  @Prop()
  suggestion: string;

  @Prop({ type: [CommentSchema] })
  questions: Comment[];
}

export const CourseDetailSchema = SchemaFactory.createForClass(CourseDetail);
