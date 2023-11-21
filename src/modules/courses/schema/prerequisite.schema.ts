import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Prerequisite {
  @Prop({ required: true })
  title: string;
}
