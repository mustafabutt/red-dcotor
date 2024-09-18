import { Controller, Get, HttpException, HttpStatus, Logger, Post, Res, Body, UseGuards  } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Stripe } from 'stripe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('stripe')
export class StripeController {
    private readonly logger = new Logger(StripeController.name);

    constructor(private readonly stripeService: StripeService) {}
  

    @Post("payment")
    createPayments(
      @Res() response,
      @Body() paymentRequestBody: any,
    ) {
      this.stripeService
        .createPayment(paymentRequestBody)
        .then((res) => {
          response.status(HttpStatus.CREATED).json(res);
        })
        .catch((err) => {
          response.status(HttpStatus.BAD_REQUEST).json(err);
        });
    }

    @Post("confirm")
    confirmPayments(
      @Res() response,
      @Body() paymentRequestBody: any,
    ) {
     
      this.stripeService
        .confirmPayment(paymentRequestBody)
        .then((res) => {
          response.status(HttpStatus.CREATED).json(res);
        })
        .catch((err) => {
          response.status(HttpStatus.BAD_REQUEST).json(err);
        });
    }

    @Get('products')
    async getProducts(): Promise<Stripe.Product[]> {
      try {
        const products = await this.stripeService.getProducts();
        this.logger.log('Products fetched successfully');
        return products;
      } catch (error) {
        this.logger.error('Failed to fetch products', error.stack);
        throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get('customers')
    async getCustomers(): Promise<Stripe.Customer[]> {
      try {
        const customers = await this.stripeService.getCustomers();
        this.logger.log('Customers fetched successfully');
        return customers;
      } catch (error) {
        this.logger.error('Failed to fetch customers', error.stack);
        throw new HttpException('Failed to fetch customers', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
