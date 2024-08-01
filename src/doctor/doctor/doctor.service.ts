import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas/feedback.schema';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import { Location, LocationDocument } from 'src/schemas/location.schema';
import { Appointment, AppointmentDocument } from 'src/schemas/appointment.schema';
import { User, UserDocument } from 'src/schemas/users.schema';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Feedback.name) private feedbackModal: Model<FeedbackDocument>,
        @InjectModel(Doctor.name) private doctorModal: Model<DoctorDocument>,
        @InjectModel(Location.name) private locationModal: Model<LocationDocument>,
        @InjectModel(Appointment.name) private appointmentModal: Model<AppointmentDocument>,
        @InjectModel(User.name) private userModal: Model<UserDocument>
    ) {}

    async createFeedback(feedback: Feedback): Promise<Feedback> {
        const newFeedback = new this.feedbackModal(feedback);
        return await newFeedback.save();
    }
    async createDoctor(doctor: Doctor): Promise<Doctor> {
        const newDoctor = new this.doctorModal(doctor);
        return await newDoctor.save();
    }
    
    async createLocation(location: Location): Promise<Location> {
        const newLocation = new this.locationModal(location);
        return await newLocation.save();
    }
    
    async readFeedback(): Promise<Feedback[]> {
        return await this.feedbackModal.find({},{'_id': 0 ,'__v': 0}).exec();
    }
    
    async readLocations(): Promise<Location[]> {
        return await this.locationModal.find({},{'__v': 0}).exec();
    }
    async readSingleLocation(id): Promise<Location> {
        return await this.locationModal.findById(id,{'__v': 0}).exec();
    }
  
    async updateLocation(id: string,location: Location): Promise<Location> {
        return await this.locationModal.findByIdAndUpdate(id,location, { new: true});
    }
    async deleteLocation(id): Promise<any> {
        return await this.locationModal.findByIdAndRemove(id);
    }
    async removeLocationFromDoctor(id): Promise<any> {
        return await this.doctorModal.updateMany( 
            { },
            { $pull: {  locations: { $in : [id]}  } }, 
            { multi: true, returnNewDocument: true }
        )
    }
    async readSingleFeedback(id): Promise<Feedback> {
        return await this.feedbackModal.findById(id,{'__v': 0}).exec();
    }
    async updateFeedback(id: string,feedback: Feedback): Promise<Feedback> {
        return await this.feedbackModal.findByIdAndUpdate(id,feedback, { new: true});
    }
  
    async removeFeedbackFromDoctor(id): Promise<any> {
        return await this.doctorModal.updateMany( 
            { },
            { $pull: {  feedback: { $in : [id]}  } }, 
            { multi: true, returnNewDocument: true }
        )
    }
    async deleteFeedback(id): Promise<any> {
        return await this.feedbackModal.findByIdAndRemove(id);
    }
    async readDoctors(): Promise<Doctor[]> {
        return await this.doctorModal.find({},{'__v': 0}).exec();
        
    }
    async readSingleDoctor(id): Promise<any> {
        return await this.doctorModal.findById(id,{'__v': 0}).exec();
       
    }
    async updateDoctor(id: string,doctor: Doctor): Promise<Doctor> {
        return await this.doctorModal.findByIdAndUpdate(id,doctor, { new: true});
    }
    async deleteDoctor(id): Promise<any> {
        return await this.doctorModal.findByIdAndRemove(id);
    }
    async removeDoctorFromFeedback(id): Promise<any> {
        return await this.feedbackModal.updateMany( 
            { },
            { $pull: {  doctor: { $in : [id]}  } }, 
            { multi: true, returnNewDocument: true }
        )
    }
    async removeDoctorFromLocation(id): Promise<any> {
        return await this.locationModal.updateMany( 
            { },
            { $pull: {  doctors: { $in : [id]}  } }, 
            { multi: true, returnNewDocument: true }
        )
    }
    async createAppointment(appointment: Appointment): Promise<Appointment> {
        const newAppointment = new this.appointmentModal(appointment);
        return await newAppointment.save();
    }
     
    async readAppointments(): Promise<Appointment[]> {
        return await this.appointmentModal.find({},{'__v': 0}).exec();
    }
    async readSingleAppointment(id): Promise<Appointment> {
        return await this.appointmentModal.findById(id,{'__v': 0}).exec();
    }
    async updateAppointment(id: string,appointment: Appointment): Promise<Appointment> {
        return await this.appointmentModal.findByIdAndUpdate(id,appointment, { new: true});
    }
    
    async deleteAppointment(id): Promise<any> {
        return await this.appointmentModal.findByIdAndRemove(id);
    }
    async addLocationsInDoctor(newLocation): Promise<any> {
        
        return await this.doctorModal.updateMany( 
            {"_id":newLocation.doctors },
            { $push: {  locations: [newLocation['_id']]}  }, 
            { multi: true, returnNewDocument: true }
        )
    }
    async addFeedbackInDoctor(feedback): Promise<any> {
        return await this.doctorModal.updateMany( 
            {"_id":feedback.doctor },
            { $set: {  feedback: feedback['_id']  }}, 
            { multi: true, returnNewDocument: true }
        )
    }
    async addAppointmentInInDoctor(appointment): Promise<any> {
      
        let doctArray = [];
        appointment.doctors.forEach(obj => {
            doctArray.push(obj.doctorIDs);
        });
        return await this.doctorModal.updateMany( 
            {"_id":doctArray },
            { $push: {  appointments: [appointment['_id']]  }}, 
            { multi: true, returnNewDocument: true }
        )
    }
    async addAppointmentInInUser(appointment): Promise<any> {
        return await this.userModal.updateMany( 
            {"_id":appointment.user },
            { $push: {  appointments: [appointment['_id']]  }}, 
            { multi: true, returnNewDocument: true }
        )
    }
    async readSingleDoctorAppointments(id): Promise<Appointment[]> {
        return await this.appointmentModal.find({ 'doctors.doctorIDs': id},{'__v':0}).exec();
    }
    async readSingleDoctorLocations(id): Promise<Location[]> {
        return await this.locationModal.find({ 'doctors': id},{'__v':0}).exec();
    }
    async readSingleDoctorFeedback(id): Promise<Feedback> {
        return await this.feedbackModal.findOne({ 'doctor': id},{'__v':0}).exec();
    }
}
