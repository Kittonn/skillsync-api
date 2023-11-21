import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Link {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;
}
