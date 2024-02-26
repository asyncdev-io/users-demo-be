import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: false })
  id: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  teamName: string;

  @Prop({ required: true, enum: ['online', 'offline', 'error'] })
  status: 'online' | 'offline' | 'error';

  @Prop({ required: true })
  statusText: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  stack: string[];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
