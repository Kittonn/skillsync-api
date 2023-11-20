import { Type } from '@/shared/enums/type.enum';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Banner } from './banner.schema';
import { Faq } from './faq.schema';
import { Category } from './category.schema';

@Schema()
export class Layout extends Document {
  @Prop({ required: true })
  type: Type;

  @Prop({ type: [Faq] })
  faq: Faq[];

  @Prop({ type: [Category] })
  categories: Category[];

  @Prop({
    type: Banner,
  })
  banner: Banner;
}

export const LayoutSchema = SchemaFactory.createForClass(Layout);
