import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Faq {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;
}