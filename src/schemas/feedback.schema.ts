import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {  Doctor } from './doctor.schema';
import {  User } from './users.schema';

export type FeedbackDocument = Feedback & Document;

@Schema()
export class Feedback {

  @Prop({ required: true})
  comments: string;

  @Prop({ required: true})
  rating: string;

  @Prop({  type: String,ref: 'Doctor'})
  doctor: Doctor;

  @Prop({ type:String, ref:'User' })
  givenBy: User;

}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
