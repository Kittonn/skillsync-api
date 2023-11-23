import { Type } from '@/shared/enums/type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Banner, BannerSchema } from './banner.schema';
import { Faq, FaqSchema } from './faq.schema';
import { Category, CategorySchema } from './category.schema';

@Schema()
export class Layout extends Document {
  @Prop({ required: true })
  type: Type;

  @Prop({ type: [FaqSchema] })
  faq: Faq[];

  @Prop({ type: [CategorySchema] })
  categories: Category[];

  @Prop({
    type: BannerSchema,
  })
  banner: Banner;
}

export const LayoutSchema = SchemaFactory.createForClass(Layout);
