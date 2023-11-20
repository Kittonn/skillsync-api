import { Role } from '@/shared/enums/role.enum';
import { Avatar } from '@/shared/interfaces/user.interface';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isVerified: boolean;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
