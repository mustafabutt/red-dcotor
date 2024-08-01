import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Appointment } from './appointment.schema';
export type UserDocument = User & Document;
import {
  ApiProperty
} from '@nestjs/swagger';
@Schema()
export class User {
  @ApiProperty()
  @Prop({ required: true, unique: true})
  email: string;
  @ApiProperty()
  @Prop({ required: true, minlength: 5 })
  password: string;
  @ApiProperty()
  @Prop({ required: true })
  gender: string;
  @ApiProperty()
  @Prop({ required: true , default:"normal"})
  role: string;
  @ApiProperty()
  @Prop({ type: [String],ref: 'Appointment' })
  appointments: Appointment[]
  @ApiProperty()
  @Prop({ required: false })
  createdBy: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
