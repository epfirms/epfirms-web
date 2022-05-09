import { Database } from '@src/core/Database';
import Container, { Inject, Service } from 'typedi';
import Stripe from 'stripe';
import { env } from '@src/core/environment-variables';
import { ConfigService } from '@src/modules/config/config.service';

@Service()
export class StripeClientService {
  apiKey: string;

  stripe: Stripe;

  constructor(private _configService: ConfigService) {
    this.apiKey = this._configService.get<string>('STRIPE_SECRET');
    // console.log(Container);
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  async getKey() {
    return this.apiKey;
  }
  
  async createCustomer(params: Stripe.CustomerCreateParams, options: Stripe.RequestOptions): Promise<Stripe.Customer> {
    const response: Stripe.Customer = await this.stripe.customers.create(params, options);

    return response;
  }
}
