import { Prop, Schema } from '@nestjs/mongoose';
import { Link } from './link.schema';

@Schema()
export class CourseDetail {
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
}
