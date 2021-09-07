import { Database } from '@src/core/Database';
const { STRIPE_SECRET } = require('@configs/vars.js');
const stripe = require('stripe')(STRIPE_SECRET);

export class PaymentProcessorService {
  // Creates a new customer object and returns stripe customer object
  public static async createCustomer(email): Promise<any> {
    const customer = await stripe.customers.create({
      email
    });

    return Promise.resolve(customer);
  }

  public static async addPayment(customerId, source): Promise<any> {
    console.log(customerId);
    console.log(source);
    const newCard = await stripe.customers.createSource(customerId, { source });

    return Promise.resolve(newCard);
  }

  public static async subscribe(customerId): Promise<any> {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: 'price_1IW4GHCwsmq5BK27HUm2vMzr' }],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: 30
    });

    return Promise.resolve(subscription);
  }

  public static async handlePaidInvoice(customerId, currentPeriodEnd): Promise<any> {
    const currentPeriodEndDate = new Date(currentPeriodEnd);

    const updateSubscription = await Database.models.firm_subscription.update(
      {
        current_period_end: currentPeriodEndDate
      },
      { where: { customer_id: customerId } }
    );

    return Promise.resolve(updateSubscription);
  }

  public static async handleUpcomingInvoice(customerEmail): Promise<string> {
    // TODO: Send reminder email for upcoming invoice
    return Promise.resolve('handled');
  }

  public static async handlePaymentFailed(customerId, customerEmail): Promise<any> {
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
