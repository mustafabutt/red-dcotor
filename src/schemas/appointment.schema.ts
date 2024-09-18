import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './users.schema';
export type AppointmentDocument = Appointment & Document;

enum AppointmentStatus {
  COMPLETED = 'Completed',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
}
@Schema()
class Doctor {
  @Prop({ required: true})
  doctorID: string;

  @Prop({ required: true})
  date: Date;

  @Prop({  required: true})
  startTime: string;

  @Prop({  required: true})
  endTime: string;
 
  @Prop()
  location: string;

  @Prop({  default: true})
  isOnline:boolean;
}
const DoctorSchema = SchemaFactory.createForClass(Doctor); 

@Schema()
export class Appointment {
  @Prop({type: [DoctorSchema], required: true})
  doctors: Doctor[];

  @Prop({ type:String, ref:'User' })
  user: User;
  
  @Prop({ required: false })
  createdBy: string;

  @Prop({ enum: AppointmentStatus,})
  status: AppointmentStatus;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
