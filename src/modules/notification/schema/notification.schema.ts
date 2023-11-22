import { User } from '@/modules/users/schema/user.schema';
import { NotificationStatus } from '@/shared/enums/notification-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: NotificationStatus.UNREAD })
  status: NotificationStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
