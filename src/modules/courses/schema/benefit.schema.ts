import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Benefit extends Document {
  @Prop({ required: true })
  title: string;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);
