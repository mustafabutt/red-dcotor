import { Injectable, NestMiddleware } from '@nestjs/common';
import { Exceptions } from '../exceptions/exceptions';
import { globalConstants } from '../constant';

@Injectable()
export class DoctorMiddleware implements NestMiddleware {

  constructor(private exceptions: Exceptions) {
  }

  use(req: any, res: any, next: () => void) {
    // var location = new RegExp(/doctor\/[^\/]+\/location\//);
    // var feedback = new RegExp(/doctor\/[^\/]+\/feedback\//);
    // var appointment = new RegExp(/doctor\/[^\/]+\/appointment\//);

    console.log(req.originalUrl)
    if(req.originalUrl == "/feedback"){
      if (req.method === globalConstants.POST) {
        if (
          req.body.hasOwnProperty(globalConstants.DOCTOR) &&
          req.body.hasOwnProperty(globalConstants.RATING)&&
          req.body.hasOwnProperty(globalConstants.COMMENTS)
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.PUT) {
        if (
          req.body.hasOwnProperty(globalConstants.DOCTOR) &&
          req.body.hasOwnProperty(globalConstants.RATING)&&
          req.body.hasOwnProperty(globalConstants.COMMENTS)
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.DELETE) {
        next();
      } else next();
    }else if(req.originalUrl == "/doctors"){
      if (req.method === globalConstants.POST) {
 
        if (
          req.body.hasOwnProperty("firstName") &&
          req.body.hasOwnProperty("lastName")&&
          req.body.hasOwnProperty("email") &&
          req.body.hasOwnProperty("age") &&
          req.body.hasOwnProperty("expertise")&&
          req.body.hasOwnProperty("waitTime")&&
          req.body.hasOwnProperty("availability")
        )
          next();
        else this.exceptions.generateBadRequestException();
      }else if (req.method === globalConstants.PUT) {
        if (
          req.body.hasOwnProperty("firstName") &&
          req.body.hasOwnProperty("lastName")&&
          req.body.hasOwnProperty("email") &&
          req.body.hasOwnProperty("age") &&
          req.body.hasOwnProperty("expertise")&&
          req.body.hasOwnProperty("waitTime")&&
          req.body.hasOwnProperty("availability")
        )
          next();
        else this.exceptions.generateBadRequestException();
      }else next();
    }else if(req.originalUrl == "/locations"){
      if (req.method === globalConstants.POST) {
        if (
          req.body.hasOwnProperty("streat") &&
          req.body.hasOwnProperty("city")&&
          req.body.hasOwnProperty("postCode")&&
          req.body.hasOwnProperty("building")
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.PUT) {
        if (
          req.body.hasOwnProperty(globalConstants.DOCTOR) &&
          req.body.hasOwnProperty(globalConstants.RATING)&&
          req.body.hasOwnProperty(globalConstants.COMMENTS)
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.DELETE) {
         next();
      } else next();
    }else if(req.originalUrl == "/appointments"){

      if (req.method === globalConstants.POST) {
        if (
          req.body.hasOwnProperty("doctors") &&
          req.body.hasOwnProperty("user")
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.PUT) {
        if (
          req.body.hasOwnProperty('doctors') &&
          req.body.hasOwnProperty('user')
        )
          next();
        else this.exceptions.generateBadRequestException();
      } else if (req.method === globalConstants.DELETE) {
         next();
      } else next();
    }else next()
  }
}
