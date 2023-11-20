import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;
}