import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Benefit extends Document {
  @Prop({ required: true })
  title: string;
}
