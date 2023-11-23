import { Thumbnail } from '@/shared/interfaces/course.interface';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Banner extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop(
    raw({
      publicId: { type: String, required: true },
      url: { type: String, required: true },
    }),
  )
  image: Thumbnail;
}

export const BannerSchema = SchemaFactory.createForClass(Banner)