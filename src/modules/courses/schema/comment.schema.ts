import { User } from '@/modules/users/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Reply, ReplySchema } from './reply.schema';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [ReplySchema] })
  commentReplies: Reply[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
