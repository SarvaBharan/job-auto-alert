import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  emailNotifications: boolean;

  @Prop({ type: Date, default: Date.now })
  lastLoginAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);