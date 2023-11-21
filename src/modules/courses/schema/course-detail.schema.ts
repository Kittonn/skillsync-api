import { Prop, Schema } from '@nestjs/mongoose';
import { Link } from './link.schema';
import { Document } from 'mongoose';
import { Comment } from './comment.schema';

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

  @Prop({ type: [Link] })
  links: Link[];

  @Prop()
  suggestion: string;

  @Prop({ type: [Comment] })
  questions: Comment[];
}
