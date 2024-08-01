import { Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards } from '@nestjs/common';
import { Exceptions } from '../../exceptions/exceptions';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Appointment } from 'src/schemas/appointment.schema';
import {DoctorService} from '../doctor/doctor.service'
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Appointments')
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointemntController {
    constructor(
        private exceptions: Exceptions,
        private readonly doctorService: DoctorService
    ) {}

    @Post()
    async createAppointment(@Res() response, @Body() appointment: Appointment) {
      try {
        const newAppointment = await this.doctorService.createAppointment(appointment);
        await this.doctorService.addAppointmentInInDoctor(newAppointment)
        await this.doctorService.addAppointmentInInUser(newAppointment)
        return response.status(HttpStatus.CREATED).json(
            newAppointment,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Get()
    async fetchAll(@Res() response) {
      try {
        const data = await this.doctorService.readAppointments();
    
        return response.status(HttpStatus.OK).json(
          data
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Get('/:id' )
    async findById(@Res() response, @Param('id') id) {
      try {
        const appointment = await this.doctorService.readSingleAppointment(id);
        return response.status(HttpStatus.OK).json(
            appointment,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Put('/:id')
      async updateAppointment(@Res() response, @Body() appointment: Appointment, @Param('id') id) {
        try {
            const updatedAppointment = await this.doctorService.updateAppointment(id,appointment);
            return response.status(HttpStatus.OK).json(updatedAppointment);
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
      @Delete('/:id')
      async deleteAppointment(@Res() response, @Param('id') id) {
        try {
            // await this.doctorService.remove(id );
            const deletedAppointment = await this.doctorService.deleteAppointment(id);
            return response.status(HttpStatus.OK).json(
                deletedAppointment
            );   
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
}
