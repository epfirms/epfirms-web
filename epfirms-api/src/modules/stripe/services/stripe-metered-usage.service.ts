import { Database } from '@src/core/Database';
import { Service } from 'typedi';
import Stripe from 'stripe';
import { StripeBaseService } from './stripe-base.service';
import { IdService } from '@src/modules/id/services/id.service';

@Service()
export class StripeMeteredUsageService {
  constructor(private stripeBaseService: StripeBaseService, private idService: IdService) {}

  async fetchCustomer(customerId: string): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    const customer = await this.stripeBaseService.fetchCustomer(customerId);
    return customer;
  }

  async createCustomer(email: string): Promise<Stripe.Customer> {
    const firmModel = Database.sequelize.models.firm;

    const customer = await this.stripeBaseService.createCustomer({ email });

    //Update firm's customer account

    return customer;
  }

  async createSubscription(
    params: Stripe.SubscriptionCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Subscription> {
    const response: Stripe.Subscription = await this.stripeBaseService.createSubscription(
      params,
      options,
    );
    return response;
  }

  async createPaymentIntent(
    customerId: string,
    amount: number,
    currency: string = 'usd',
  ): Promise<Stripe.PaymentIntent> {
    const key = await this.idService.generate();
    const paymentIntent = await this.stripeBaseService.createPaymentIntent(
      { customer: customerId, amount, currency },
      { idempotencyKey: key },
    );

    return paymentIntent;
  }

  async confirmPaymentIntent(id: string): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripeBaseService.confirmPaymentIntent(id);
    return paymentIntent;
  }

  private async updateCreditBalance(
    customerId: string,
    amount: number,
    currency: string = 'usd',
  ): Promise<Stripe.CustomerBalanceTransaction> {
    const balanceTransaction = await this.stripeBaseService.createBalanceTransaction(customerId, {
      amount,
      currency,
    });
    return balanceTransaction;
  }

  async creditCustomerBalance(customerId: string, amount: number, currency: string = 'usd') {
    const creditAmount = Math.abs(amount) * -1;
    await this.updateCreditBalance(customerId, creditAmount, currency);
  }

  async hasFundsForItem(customerId: string, priceId: string): Promise<boolean> {
    const subscriptionItem = await this.getSubscriptionItemByPriceId(customerId, priceId);
    const adjustedBalance = await this.getAdjustedCustomerBalance(customerId);
    const balance = adjustedBalance * -1;
    const price = subscriptionItem.price.unit_amount;

    return Promise.resolve(balance - price >= 0);
  }

  /** Returns the customer's credit balance minus any upcoming usage items. The balance returned should be a negative number since it is a credit balance. */
  async getAdjustedCustomerBalance(customerId: string): Promise<number> {
    const customer = await this.fetchCustomer(customerId);
    const lineItems = await this.stripeBaseService.listUpcomingLineItems({ customer: customerId });
    let usageTotal: number = 0;
    for (let item of lineItems) {
      usageTotal = usageTotal + item.amount;
    }

    return Promise.resolve(customer['balance'] + usageTotal);
  }

  async getSubscriptionItemByPriceId(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.SubscriptionItem> {
    const subscriptions = await this.listCustomerSubscriptions(customerId, priceId);

    if (subscriptions.length) {
      const subscription = subscriptions[0];
      const subscriptionItems = await this.listSubscriptionItems(subscription.id);
      if (subscriptionItems.length) {
        // Find the subscription item that matches the sms messaging price.
        const subscriptionItem = subscriptionItems.find((item) => item.price.id === priceId);

        return Promise.resolve(subscriptionItem);
      }
    }
    return Promise.reject('Problem retrieving subscription item');
  }

  async listCustomerSubscriptions(customerId: string, priceId: string) {
    const subscription = await this.stripeBaseService.listSubscriptions({
      customer: customerId,
      price: priceId,
    });
    return subscription.data;
  }

  async listSubscriptionItems(subscriptionId: string) {
    const subscriptionItems = await this.stripeBaseService.listSubscriptionItems({
      subscription: subscriptionId,
    });
    return subscriptionItems.data;
  }

  async createUsageRecord(
    subscriptionId: string,
    params: Stripe.UsageRecordCreateParams,
  ): Promise<Stripe.UsageRecord> {
    const usageRecord = await this.stripeBaseService.createUsageRecord(subscriptionId, params);
    return usageRecord;
  }

  async findCustomerIdByFirm(firmId: number) {
    const stripeCustomerModel = Database.sequelize.models.stripe_customer;
    const customer: any = await stripeCustomerModel.findOne({ where: { firm_id: firmId } });
    return customer.customer_id;
  }
}
