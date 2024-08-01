import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards
  } from '@nestjs/common';
import { Exceptions } from '../exceptions/exceptions';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {DoctorService} from './doctor/doctor.service'
import { Doctor } from 'src/schemas/doctor.schema';

import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
@ApiBearerAuth()
@ApiTags('Doctors')

@UseGuards(JwtAuthGuard)
@Controller('doctor')
export class DoctorController {
    constructor(
        private exceptions: Exceptions,
        private readonly doctorService: DoctorService
    ) {}

    @Post()
    async createUser(@Res() response, @Body() doctor: Doctor) {
        try {
        const newDoctor = await this.doctorService.createDoctor(doctor)
        return response.status(HttpStatus.CREATED).json(
            newDoctor,
          );
        } catch (err) {
        this.exceptions.generateGeneralException(err);
        }
    }

    @Get()
    async fetchAll(@Res() response) {
      try {
        const data = await this.doctorService.readDoctors();
    
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
        const location = await this.doctorService.readSingleDoctor(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Put('/:id')
    async updateClient(@Res() response, @Body() doctor: Doctor, @Param('id') id) {
      try {
          const updatedDoctor = await this.doctorService.updateDoctor(id,doctor);
          return response.status(HttpStatus.OK).json(updatedDoctor);
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Delete('/:id')
      async deleteClient(@Res() response, @Param('id') id) {
        try {
            await this.doctorService.removeDoctorFromFeedback(id );
            await this.doctorService.removeDoctorFromLocation(id );
            const deletedFeedback = await this.doctorService.deleteDoctor(id);
            return response.status(HttpStatus.OK).json(
              deletedFeedback,
            );   
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }

    @Get('/:id/appointments' )
    async findDoctorAppointments(@Res() response, @Param('id') id) {
      try {
        const location = await this.doctorService.readSingleDoctorAppointments(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }

    @Get('/:id/locations' )
    async findDoctorLocations(@Res() response, @Param('id') id) {
      try {
        const location = await this.doctorService.readSingleDoctorLocations(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Get('/:id/feedback' )
    async findDoctorFeedback(@Res() response, @Param('id') id) {
      try {
        const location = await this.doctorService.readSingleDoctorFeedback(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }

}
