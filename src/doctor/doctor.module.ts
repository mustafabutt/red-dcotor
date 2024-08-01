import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from '../schemas/doctor.schema';
import { Location, LocationSchema } from '../schemas/location.schema';
import { Feedback, FeedbackSchema } from '../schemas/feedback.schema';
import { Appointment, AppointmentSchema } from 'src/schemas/appointment.schema';
import { LocationController } from './location/location.controller';
import { FeedbackController } from './feedback/feedback.controller';
import { DoctorService } from './doctor/doctor.service';
import { DoctorMiddleware } from './doctor.middleware';
import { AppointemntController } from './appointemnt/appointemnt.controller';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  controllers: [DoctorController, LocationController, FeedbackController, AppointemntController],
  providers: [Exceptions, DoctorService],
  imports:[
        MongooseModule.forFeature([
            { name: Doctor.name, schema: DoctorSchema },
            { name: Location.name, schema: LocationSchema },
            { name: Feedback.name, schema: FeedbackSchema },
            { name: Appointment.name, schema: AppointmentSchema },
            { name: User.name, schema: UserSchema }
        ])
    ]
})
export class DoctorModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(DoctorMiddleware).forRoutes(globalConstants.DOCTOR);
    }
}


