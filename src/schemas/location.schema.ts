import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Doctor } from './doctor.schema';

export type LocationDocument = Location & Document;

@Schema()
export class Location {

  @Prop({ required: true})
  city: string;

  @Prop({ required: true})
  streat: string;

  @Prop({ required: true})
  postCode: string;

  @Prop({ required: true})
  hospital: string;

  @Prop({ type: [String],ref: 'Doctor' })
  doctors: Doctor[]

}

export const LocationSchema = SchemaFactory.createForClass(Location);
