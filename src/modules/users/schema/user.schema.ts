import { Course } from '@/modules/courses/schema/course.schema';
import { Role } from '@/shared/enums/role.enum';
import { Avatar } from '@/shared/interfaces/user.interface';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  refreshToken?: string;

  @Prop(
    raw({
      url: { type: String },
      publicId: { type: String },
    }),
  )
  avatar?: Avatar;

  @Prop({ default: Role.USER })
  role: Role;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    default: [],
  })
  courses?: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
