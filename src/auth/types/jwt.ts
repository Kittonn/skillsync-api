import { Types } from 'mongoose';

export interface TokenPayload {
  sub: Types.ObjectId | string;
}

export interface TokenConfig {
  secret: string;
  expiresIn: string;
}
