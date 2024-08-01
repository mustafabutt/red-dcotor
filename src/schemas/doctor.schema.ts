import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from './location.schema';
import { Feedback } from './feedback.schema';
import { Appointment } from './appointment.schema';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop({ required: true})
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  fees: number;

  @Prop({ required: true })
  expertise: string;

  @Prop({ required: true })
  waitTime: string;

  @Prop({ required: true })
  availability: [];

  @Prop({ type: [String],ref: 'Location' })
  locations: Location[]

  @Prop({ type: [String],ref: 'Appointment' })
  appointments: Appointment[]

  @Prop({ type: String,ref: 'Feedback', default:null})
  feedback: Feedback
  
  @Prop({ required: false })
  createdBy: string;

}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
