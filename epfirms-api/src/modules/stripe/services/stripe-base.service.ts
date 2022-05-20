import { Service } from 'typedi';
import Stripe from 'stripe';
import { ConfigService } from '@src/modules/config/config.service';

@Service()
export class StripeBaseService {
  stripe: Stripe;

  constructor(private _configService: ConfigService) {
    const apiKey = this._configService.get<string>('STRIPE_SECRET');

    this.stripe = new Stripe(apiKey, {
      apiVersion: '2020-08-27',
    });
  }

  /** Returns the customer or deleted customer object. */
  async fetchCustomer(
    id: string,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    const response: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> =
      await this.stripe.customers.retrieve(id, options);
    return response;
  }

  /** Returns the created stripe customer.  */
  async createCustomer(
    params?: Stripe.CustomerCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Customer> {
    const response: Stripe.Response<Stripe.Customer> = await this.stripe.customers.create(
      params,
      options,
    );

    return response;
  }

  /** Updates the customer by swetting the values of the parameteres passed. Any parameters not provided will be left unchanged. */
  async updateCustomer(
    id: string,
    params?: Stripe.CustomerUpdateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Customer> {
    const response: Stripe.Response<Stripe.Customer> = await this.stripe.customers.update(
      id,
      params,
      options,
    );
    return response;
  }

  /** Permanently deletes a customer and cancels any active subcriptions on the customer. */
  async deleteCustomer(
    id: string,
    params?: Stripe.CustomerDeleteParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.DeletedCustomer> {
    const response: Stripe.Response<Stripe.DeletedCustomer> = await this.stripe.customers.del(
      id,
      params,
      options,
    );
    return response;
  }

  async fetchSubscription(
    id: string,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.Subscription> {
    const response: Stripe.Response<Stripe.Subscription> = await this.stripe.subscriptions.retrieve(
      id,
      options,
    );
    return response;
  }

  /** Creates a new subscription on an existing customer. Limit: 500 active/scheduled subscriptions per customer. */
  async createSubscription(
    params: Stripe.SubscriptionCreateParams,
    options: Stripe.RequestOptions,
  ): Promise<Stripe.Subscription> {
    const response: Stripe.Response<Stripe.Subscription> = await this.stripe.subscriptions.create(
      params,
      options,
    );

    return response;
  }

  async listSubscriptions(
    params?: Stripe.SubscriptionListParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.ApiList<Stripe.Subscription>> {
    const response: Stripe.Response<Stripe.ApiList<Stripe.Subscription>> =
      await this.stripe.subscriptions.list(params, options);
    return response;
  }

  async listSubscriptionItems(
    params?: Stripe.SubscriptionItemListParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.ApiList<Stripe.SubscriptionItem>> {
    const response: Stripe.Response<Stripe.ApiList<Stripe.SubscriptionItem>> =
      await this.stripe.subscriptionItems.list(params, options);
    return response;
  }

  /** Returns a specific customer balance transaction that updated the customer's balances. */
  async fetchBalanceTransaction(
    customerId: string,
    id: string,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.CustomerBalanceTransaction> {
    const response: Stripe.Response<Stripe.CustomerBalanceTransaction> =
      await this.stripe.customers.retrieveBalanceTransaction(customerId, id, options);
    return response;
  }

  /** Creates an immutable transaction that updates the customer's credit balance. */
  async createBalanceTransaction(
    id: string,
    params: Stripe.CustomerBalanceTransactionCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.CustomerBalanceTransaction> {
    const response: Stripe.Response<Stripe.CustomerBalanceTransaction> =
      await this.stripe.customers.createBalanceTransaction(id, params, options);
    return response;
  }

  /** Returns a list of transactions that updated the customer's balances. */
  async listBalanceTransactions(
    id: string,
    params?: Stripe.CustomerBalanceTransactionListParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.ApiList<Stripe.CustomerBalanceTransaction>> {
    const response: Stripe.Response<Stripe.ApiList<Stripe.CustomerBalanceTransaction>> =
      await this.stripe.customers.listBalanceTransactions(id, params, options);
    return response;
  }

  //** Creates a usage record for a subscription item and date. */
  async createUsageRecord(
    id: string,
    params: Stripe.UsageRecordCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.UsageRecord> {
    const response: Stripe.Response<Stripe.UsageRecord> =
      await this.stripe.subscriptionItems.createUsageRecord(id, params, options);
    return response;
  }

  /** Returns a list of summary object for a subscription item. */
  async listUsageRecordSummaries(
    id: string,
    params?: Stripe.UsageRecordSummaryListParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.ApiList<Stripe.UsageRecordSummary>> {
    const response: Stripe.Response<Stripe.ApiList<Stripe.UsageRecordSummary>> =
      await this.stripe.subscriptionItems.listUsageRecordSummaries(id, params, options);
    return response;
  }

  async createPaymentIntent(
    params: Stripe.PaymentIntentCreateParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.PaymentIntent> {
    const response: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.create(
      params,
      options,
    );
    return response;
  }

  async fetchPaymentIntent(
    id: string,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.PaymentIntent> {
    const response: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripe.paymentIntents.retrieve(id, options);
    return response;
  }

  async confirmPaymentIntent(
    id: string,
    params?: Stripe.PaymentIntentConfirmParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.PaymentIntent> {
    const response: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripe.paymentIntents.confirm(id, params, options);
    return response;
  }

  async capturePaymentIntent(
    id: string,
    params?: Stripe.PaymentIntentCaptureParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.PaymentIntent> {
    const response: Stripe.Response<Stripe.PaymentIntent> =
      await this.stripe.paymentIntents.capture(id, params, options);
    return response;
  }

  async cancelPaymentIntent(
    id: string,
    params?: Stripe.PaymentIntentCancelParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.PaymentIntent> {
    const response: Stripe.Response<Stripe.PaymentIntent> = await this.stripe.paymentIntents.cancel(
      id,
      params,
      options,
    );
    return response;
  }

  async verifyPaymentIntentMicrodeposits(id: string): Promise<any> {
    return Stripe.StripeResource.extend({
      request: Stripe.StripeResource.method({
        method: 'POST',
        path: `payment_intents/${id}/verify_microdeposits`,
      }),
    }).request({ amounts: [] }, function (err, response) {
      if (err) {
        throw err;
      }
      return response;
    });
  }

  async listUpcomingLineItems(
    params?: Stripe.InvoiceLineItemListUpcomingParams,
    options?: Stripe.RequestOptions,
  ): Promise<Stripe.InvoiceLineItem[]> {
    const response: Stripe.Response<Stripe.ApiList<Stripe.InvoiceLineItem>> =
      await this.stripe.invoices.listUpcomingLineItems(params, options);
    return response.data;
  }
}
