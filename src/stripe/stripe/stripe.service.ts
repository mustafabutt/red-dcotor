import { Injectable, Inject, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private readonly stripe: Stripe;
    private readonly logger = new Logger(StripeService.name);
  
    constructor() {
      this.stripe = new Stripe('sk_test_51PuKHbB7c1vTOLUcMIj3dJCU713JqnU7W41wIhghZnjMg2Eml3mE6MsPQ15Pico0nliQq063DtIZFgiLc8Ml9Ymf00POhHy0XS', {
    });
      this.logger.log('StripeService initialized with API version 2023-10-16');
    }

    createPayment(paymentRequestBody): Promise<any> {
        // let sumAmount = 0;
        // paymentRequestBody.products.forEach((product) => {
        //   sumAmount = sumAmount + product.price * product.quantity;
        // });
        this.logger.log("logger is calleddddd");
        this.logger.log(paymentRequestBody);
        return this.stripe.paymentIntents.create({
          amount: paymentRequestBody.amount,
          currency: paymentRequestBody.currency,
          automatic_payment_methods: {
            enabled: true,
          },
        });
    }
    confirmPayment(paymentRequestBody): Promise<any> {
        
     
        return this.stripe.paymentIntents.confirm(paymentRequestBody.secret,{
            payment_method: 'pm_card_visa',
            return_url: 'https://www.example.com',
          });
    }
  
    async getProducts(): Promise<Stripe.Product[]> {
      try {
        const products = await this.stripe.products.list();
        this.logger.log('Products fetched successfully');
        return products.data;
      } catch (error) {
        this.logger.error('Failed to fetch products from Stripe', error.stack);
        throw new Error('Unable to fetch products from Stripe');
      }
    }
  
    async getCustomers(): Promise<Stripe.Customer[]> {
      try {
        const customers = await this.stripe.customers.list();
        this.logger.log('Customers fetched successfully');
        return customers.data;
      } catch (error) {
        this.logger.error('Failed to fetch customers from Stripe', error.stack);
        throw new Error('Unable to fetch customers from Stripe');
      }
    }
}
