import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Link extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  url: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);