import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class JobAlert extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  lastChecked: Date;

  @Prop()
  lastNotified: Date;

  @Prop({ type: Object })
  metadata: Record<string, any>;
}

export const JobAlertSchema = SchemaFactory.createForClass(JobAlert);