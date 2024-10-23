import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // Add other fields as needed
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add this type to represent a user as a plain object
export type UserObject = {
  [K in keyof User]: User[K];
} & {
  _id: string;
};
