import { Role } from '@/auth/enums/role.enum';
import { Course } from '@/courses/schema/course.schema';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: [true, 'Please enter your name'] })
  name: string;

  @Prop({
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password must be at least 8 characters'],
  })
  password: string;

  @Prop({ required: [true, 'Please enter your email'], unique: true })
  email: string;

  @Prop(raw({ url: { type: String }, public_id: { type: String } }))
  avatar: Record<string, any>;

  @Prop({ default: Role.User })
  role: Role;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    ],
    default: [],
  })
  courses: Course[];
}

export const UserSchema = SchemaFactory.createForClass(User);
