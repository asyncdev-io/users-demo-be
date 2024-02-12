import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CreateUser {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  teamName: string;

  @Prop({ required: true, type: String }) // Especifica el tipo aquí
  status: string;

  @Prop({ required: true })
  statusText: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  stack: string[];
}

export const UserSchema = SchemaFactory.createForClass(CreateUser);
