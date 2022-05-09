import { Database } from '@src/core/Database';
const { STRIPE_SECRET, STRIPE_PLAN } = require('@configs/vars');
import Stripe from 'stripe';
import { Service } from 'typedi';

@Service()
export class PaymentProcessorService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET, {
      apiVersion: '2020-08-27',
    });
  }
  // Creates a new customer object and returns stripe customer object
  async createCustomer(params: Stripe.CustomerCreateParams, opts?: Stripe.RequestOptions): Promise<any> {
    const customer = await this.stripe.customers.create(params, opts);

    return Promise.resolve(customer);
  }

  async addPayment(customerId, source): Promise<any> {
    const newCard = await this.stripe.customers.createSource(customerId, { source });

    return Promise.resolve(newCard);
  }

  async subscribe(customerId): Promise<any> {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: STRIPE_PLAN}],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 30
    });

    return Promise.resolve(subscription);
  }

  async handlePaidInvoice(customerId, currentPeriodEnd): Promise<any> {
    const currentPeriodEndDate = new Date(currentPeriodEnd * 1000);

    const updateSubscription = await Database.models.firm_subscription.update(
      {
        current_period_end: currentPeriodEndDate
      },
      { where: { customer_id: customerId } }
    );

    return Promise.resolve(updateSubscription);
  }

  async handleUpcomingInvoice(customerEmail): Promise<string> {
    // TODO: Send reminder email for upcoming invoice
    return Promise.resolve('handled');
  }

  async handlePaymentFailed(customerId, customerEmail): Promise<any> {
    const updateSubscription = await Database.models.firm_subscription.update(
      {
        current_period_end: null
      },
      { where: { customer_id: customerId } }
    );

    // TODO: Send customer email to update payment method

    return Promise.resolve(updateSubscription);
  }
}
