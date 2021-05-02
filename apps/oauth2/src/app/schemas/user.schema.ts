import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true, unique: true })
  discordId: string;

  @Prop({ required: true })
  discriminator: string;

  @Prop({ required: true })
  refreshToken: string;

  @Prop({ required: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
