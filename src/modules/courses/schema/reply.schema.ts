import { User } from "@/modules/users/schema/user.schema";
import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class Reply extends Document {
  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}