import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Benefit {
  @Prop({ required: true })
  title: string;
}
