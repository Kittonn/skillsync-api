import { User } from '@/modules/users/schema/user.schema';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Comment } from './comment.schema';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ default: 0 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: [Comment]})
  reviewReplies: Comment[];
}
