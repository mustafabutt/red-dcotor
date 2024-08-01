
import { Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards } from '@nestjs/common';
import { Exceptions } from '../../exceptions/exceptions';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Location } from 'src/schemas/location.schema';
import {DoctorService} from '../doctor/doctor.service'
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Locations')

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationController {
    constructor(
        private exceptions: Exceptions,
        private readonly doctorService: DoctorService
    ) {}

    @Post()
    async createLocation(@Res() response, @Body() location: Location) {
      try {
        const newLocation = await this.doctorService.createLocation(location);
        await this.doctorService.addLocationsInDoctor(newLocation);

        return response.status(HttpStatus.CREATED).json(
            newLocation,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Get()
    async fetchAll(@Res() response, @Req() request: Request) {
      try {
        console.log("yes i am in,,...");
        console.log(request.cookies);
        const data = await this.doctorService.readLocations();
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
        const location = await this.doctorService.readSingleLocation(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Put('/:id')
      async updateLocation(@Res() response, @Body() location: Location, @Param('id') id) {
        try {
            const updatedLocation = await this.doctorService.updateLocation(id,location);
            return response.status(HttpStatus.OK).json(
                updatedLocation,
            );
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
      @Delete('/:id')
      async deleteLocation(@Res() response, @Param('id') id,@Body() body: any) {
        try {
            this.doctorService.removeLocationFromDoctor(id );
            const deletedLocation = await this.doctorService.deleteLocation(id);
            return response.status(HttpStatus.OK).json(
                deletedLocation,
            );   
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
}
