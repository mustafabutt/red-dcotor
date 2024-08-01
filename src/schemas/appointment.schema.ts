import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './users.schema';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({  required: true})
  doctors: [object];

  @Prop({ type:String, ref:'User' })
  user: User;
  
  @Prop({ required: false })
  createdBy: string;

}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
