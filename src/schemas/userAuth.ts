import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AuthUser {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;
}

export type AuthUserDocument = AuthUser & Document;
export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
