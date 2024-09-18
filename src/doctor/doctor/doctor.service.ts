import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, FeedbackDocument } from 'src/schemas/feedback.schema';
import { Doctor, DoctorDocument } from 'src/schemas/doctor.schema';
import { Location, LocationDocument } from 'src/schemas/location.schema';
import { Appointment, AppointmentDocument } from 'src/schemas/appointment.schema';
import { User, UserDocument } from 'src/schemas/users.schema';
import { filterDoctorsbyCity, removeEmptyLocation, generateSlots } from 'src/utils/utils';

@Injectable()
export class DoctorService {
    private readonly logger = new Logger(DoctorService.name);
    constructor(
        @InjectModel(Feedback.name) private feedbackModal: Model<FeedbackDocument>,
        @InjectModel(Doctor.name) private doctorModal: Model<DoctorDocument>,
        @InjectModel(Location.name) private locationModal: Model<LocationDocument>,
        @InjectModel(Appointment.name) private appointmentModal: Model<AppointmentDocument>,
        @InjectModel(User.name) private userModal: Model<UserDocument>
        
    ) {
        this.logger.log('DoctorService initialized.');
    }

    async getAvailableSlots(doctor): Promise<any> {
      
        // this.logger.log(timing);
    }

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
    async readDoctors(query): Promise<any> {

        if(Object.keys(query).length > 0){
            const doctors = await this.doctorModal.find().select({'firstName':1,'doctorTiming':1, 'lastName':1, 'expertise':1, 'qualification':1, 'fees':1, 'waitTime':1}).populate({
                path: 'doctorTiming.location',  
                select: { hospital: 1, city: 1, _id: 0 },  
                match: { city: { $eq: query.city } }, 
              }).exec();
            let DoctorsbyCity = await filterDoctorsbyCity(doctors, query.city);
            return await removeEmptyLocation(DoctorsbyCity)
        }   
        else return await this.doctorModal.find({}).select({'firstName':1, 'lastName':1, 'expertise':1, 'qualification':1, 'fees':1, 'waitTime':1}).exec();     
        
    }
    async readSingleDoctor(id, query): Promise<any> {
        if(Object.keys(query).length > 0){
            const doctor = await this.doctorModal.findById(id,{'__v': 0}).populate('feedback',{'comments':1,'rating':1,'_id':0}).populate({
                path: 'doctorTiming.location',  
                select: { hospital: 1, city: 1, _id: 0 },  
                match: { city: { $eq: query.city } }, 
              }).exec();
              let arr = [];
              arr.push(doctor)
            let DoctorbyCity = await filterDoctorsbyCity(arr, query.city)
            const finalData = await removeEmptyLocation(DoctorbyCity)[0];
            await generateSlots(finalData.doctorTiming);
            return finalData;
        }else return await this.doctorModal.findById(id,{'__v': 0}).populate('feedback',{'comments':1,'rating':1,'_id':0}).populate('doctorTiming.location',{'hospital':1,'_id':0,'city':1});
       
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


// [{
//     "_id": "66dee523c29e567261d0ffce",
//     "firstName": "Husna",
//     "lastName": "Khan",
//     "email": "hus@gmail.com",
//     "age": 4500,
//     "fees": 1200,
//     "expertise": "Physio",
//     "qualification": "PU Lahore (Silver MEDALIST)",
//     "waitTime": "1 hours",
//     "doctorTiming": [
//         {
//             "location": [
//                 {
//                     "city": "sialkot",
//                     "hospital": "kiran international"
//                 }
//             ],
//             "timing": [
//                 {
//                     "day": "Mon",
//                     "start_time": "09:00 AM",
//                     "end_time": "12:00 PM"
//                 }
//             ]
//         },
//         {
//             "location": [
//                 {
//                     "city": "lahore",
//                     "hospital": "Ahad Hospital"
//                 }
//             ],
//             "timing": [
//                 {
//                     "day": "Wed",
//                     "start_time": "12:00 PM",
//                     "end_time": "10:00 PM"
//                 },
//                 {
//                     "day": "Sun",
//                     "start_time": "11:00 PM",
//                     "end_time": "10:00 PM"
//                 }
//             ]
//         }
//     ],
//     "appointments": [],
//     "feedback": []
// },
// {
//     "_id": "66dee416c29e567261d0ffc8",
//     "firstName": "idrees",
//     "lastName": "khan",
//     "email": "amir@gmail.com",
//     "age": 55,
//     "fees": 2000,
//     "expertise": "Idrees Specialist",
//     "qualification": "MBBS (GOLD MEDALIST)",
//     "waitTime": "2 hours",
//     "doctorTiming": [
//         {
//             "location": [
//                 {
//                     "city": "sialkot",
//                     "hospital": "kiran international"
//                 }
//             ],
//             "timing": [
//                 {
//                     "day": "Mon",
//                     "start_time": "09:00 AM",
//                     "end_time": "12:00 PM"
//                 }
//             ]
//         }
//     ],
//     "appointments": [
//         "66c2418e564a96898773a00a"
//     ],
//     "feedback": [
//         {
//             "comments": "highly recomended plus+",
//             "rating": "5"
//         }
//     ]
// },
// {
//     "_id": "66dee49ec29e567261d0ffca",
//     "firstName": "Lal",
//     "lastName": "Badshah",
//     "email": "rahim@gmail.com",
//     "age": 45,
//     "fees": 2500,
//     "expertise": "Medicine Specialist",
//     "qualification": "King Edward (GOLD MEDALIST)",
//     "waitTime": "2 hours",
//     "doctorTiming": [
//         {
//             "location": [
//                 {
//                     "city": "lahore",
//                     "hospital": "Ahad Hospital"
//                 }
//             ],
//             "timing": [
//                 {
//                     "day": "Tue",
//                     "start_time": "12:00 PM",
//                     "end_time": "10:00 PM"
//                 }
//             ]
//         }
//     ],
//     "appointments": [],
//     "feedback": []
// }
// ]