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
import { Feedback } from 'src/schemas/feedback.schema';
import {DoctorService} from '../doctor/doctor.service'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Feedback')
@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
    constructor(
        private exceptions: Exceptions,
        private readonly doctorService: DoctorService
    ) {}

    @Post()
    async createFeedback(@Res() response, @Body() feedback: Feedback) {
      try {
        const newFeedback = await this.doctorService.createFeedback(feedback);
        await this.doctorService.addFeedbackInDoctor(newFeedback)
        return response.status(HttpStatus.CREATED).json(
          newFeedback,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }

    @Get()
    async fetchAll(@Res() response) {
      try {
        const data = await this.doctorService.readFeedback();
    
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
        const location = await this.doctorService.readSingleFeedback(id);
        return response.status(HttpStatus.OK).json(
            location,
        );
      } catch (err) {
        this.exceptions.generateGeneralException(err);
      }
    }
    @Put('/:id')
      async updateFeedback(@Res() response, @Body() feedback: Feedback, @Param('id') id) {
        try {
            const updatedFeedback = await this.doctorService.updateFeedback(id,feedback);
            return response.status(HttpStatus.OK).json(updatedFeedback);
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
      @Delete('/:id')
      async deleteFeedback(@Res() response, @Param('id') id) {
        try {
            await this.doctorService.removeFeedbackFromDoctor(id );
            const deletedFeedback = await this.doctorService.deleteFeedback(id);
            return response.status(HttpStatus.OK).json(
              deletedFeedback,
            );   
        } catch (err) {
          this.exceptions.generateGeneralException(err);
        }
      }
}
