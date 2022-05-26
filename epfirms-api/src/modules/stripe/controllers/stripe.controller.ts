import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { StripeService } from '../services/stripe.service';
import { emailsService } from '@src/modules/emails/services/emails.service';
import { Service } from 'typedi';
import { StripeMeteredUsageService } from '../services/stripe-metered-usage.service';
import { ConfigService } from '@src/modules/config/config.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripeWebhookSig = process.env.STRIPE_WEBHOOK_KEY;

@Service()
export class StripeController {
  // fee rate: better way of calculating fees
  // in general all fees get passed to firm not customer
  feeRate: number = 0.029 + 0.011;
  feePercent: number = 4;

  constructor(
    private _emailService: emailsService,
    private _stripeService: StripeService,
    private _stripeMeteredUsageService: StripeMeteredUsageService,
    private _configService: ConfigService
  ) {}

  // This method takes the day in a month that the billing cycle will bill on
  // It then sets the anchor to be in the next month
  private _generateDateAnchor(day): number {
    let date = new Date();
    date.setMonth(date.getMonth() + 1, day);
    return date.getTime();
  }

  private _roundToCurrency(n): number {
    return Math.round(100 * n) / 100;
  }

  //takes the stripe accountId and origin or request and creates the secure link to setup
  //stripe integration
  private _generateAccountLink(accountID, origin) {
    return stripe.accountLinks
      .create({
        type: 'account_onboarding',
        account: accountID,
        refresh_url: `${origin}/login`,
        return_url: `${origin}/firm/settings/billing-integration`,
      })
      .then((link) => link.url);
  }

  // this method gets the stripe account_id with the logged in user's firm_id.
  // it then uses the stripe API to verify that it is a connected account.
  // it returns true if the account_id can be matched in the list of connected accounts
  public async getConnectionStatus(req, res: Response): Promise<any> {
    try {
      // there are two cases in which we might need to grab the firm_id
      // a connection status request from the client portal or the firm portal
      let firm_id;
      if (req.user.firm_access == null) {
        firm_id = req.user.client_access[0].id;
      } else {
        firm_id = req.user.firm_access.firm_id;
      }
      // get the stripe account record if it exists in db
      const stripeAccount = await this._stripeService.getStripeAccountId(firm_id);
      // if there is an existing stripe account, use the stripe api to compare it to connected
      // accounts.
      if (stripeAccount !== null) {
        const connectedAccounts = await stripe.accounts.list();

        let match: boolean = false;

        connectedAccounts.data.forEach((account) => {
          if (stripeAccount.account_id === account.id) {
            match = true;
          }
        });
        // send the response and whether or not there was a connection
        res.status(StatusConstants.OK).send({ isConnected: match, account: stripeAccount });
      } else {
        res.status(StatusConstants.OK).send({ isConnected: false });
      }
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //method that handles the request to integrate stripe into EPFirms firm profile
  public async integration(req, res: Response): Promise<any> {
    try {
      //get the origin to build the return and refresh urls

      const origin = `${req.headers.referer}`;
      // check to see if there is an existing entry with a Stripe account_id for the firm
      const existing_account = await this._stripeService.getStripeAccountId(
        req.user.firm_access.firm_id,
      );

      // if there is no existing account_id then create a new one and save to DB
      if (existing_account === null) {
        const account = await stripe.accounts.create({
          type: 'standard',
        });
        const createEntry = await this._stripeService.createStripeAccount(
          account.id,
          req.user.firm_access.firm_id,
        );
        const accountLinkURL = await this._generateAccountLink(account.id, origin);
        res.send({ url: accountLinkURL });
      }
      // if the db already has an account_id for the firm just generate the account linking url
      else {
        const accountLinkURL = await this._generateAccountLink(
          existing_account.dataValues.account_id,
          origin,
        );
        res.send({ url: accountLinkURL });
      }
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async createPaymentSession(req, res: Response): Promise<any> {
    try {
      let amount = this._roundToCurrency(req.body.balance);
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.description,
              },
              //conversion to cents since Stripe API uses this; might need a better way
              unit_amount_decimal: Math.round(amount / 0.01),
              // recurring: {
              //   interval: "month",
              //   interval_count: 1,
              // },
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_intent_data: {
          application_fee_amount: Math.round((amount * this.feeRate) / 0.01),
          transfer_data: {
            destination: req.body.connected_account,
          },
        },
        success_url: req.headers.referer,
        cancel_url: req.headers.referer,

        metadata: {
          principle_charge: req.body.balance,
        },
      });

      res.status(StatusConstants.OK).send({ url: session.url, session_id: session.id });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async createSubscriptionSession(req, res: Response): Promise<any> {
    try {
      let amount = this._roundToCurrency(req.body.balance);
      console.log('REQ.BODY', req.body);
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Billing Subscription',
              },
              //conversion to cents since Stripe API uses this; might need a better way
              unit_amount_decimal: Math.round(amount / 0.01),
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            },
            quantity: 1,
          },
        ],
        // billing cycle anchor does not exist in StripeCheckout atm
        // billing_cycle_anchor: this._generateDateAnchor(req.body.due_date),
        mode: 'subscription',
        success_url: req.headers.referer,
        cancel_url: req.headers.referer,
        subscription_data: {
          application_fee_percent: this.feePercent,
          transfer_data: {
            destination: req.body.connected_account,
          },
        },
        metadata: {
          principle_charge: req.body.balance,
        },
      });

      console.log(' SUB SESSION', session);
      res.status(StatusConstants.OK).send({ url: session.url, session_id: session.id });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //handler for webhook events from Stripe; might need to modulize the respective events later
  public async eventHandler(req, res: Response): Promise<any> {
    try {
      const payload = req.body;

      const sig = req.headers['stripe-signature'];

      let event;

      event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSig);
      const session = event.data.object;

      if (event.type === 'checkout.session.completed') {
        const fufillment = await this._stripeService.fufillPaymentSession(session);
        if (session.subscription) {
          const subscription = await this._stripeService.fufillSubscriptionSession(session);
        }

        res.status(200).send();
      } else if (event.type === 'customer.subscription.created') {
        console.log('CUSTOMER SUB CREATED SESSION CREATED');
        console.log(session);
        res.status(200).send();
      } else if (event.type === 'invoice.created') {
        console.log('INVOICE CREATED SESSION');
        console.log(session);
      } else if (event.type === 'invoice.payment_succeeded') {
        console.log('INVOICE PAYMENT SUCCESS SESSION');
        console.log(session);
        if (session.subscription) {
          const updatedCustomerAccount = await this._stripeService.fufillInvoicePaymentSuccess(
            session,
          );
          // if the updated customer account has an associated subscription and its active, it will send the email
          if (updatedCustomerAccount.sendEmail) {
            //send an email template for successful payment
            const email = await this._emailService.sendFromTemplate(
              session.customer_email,
              'Auto Payment Success',
              'successful-auto-payment',
              { 'v:amount': session.amount_paid / 100 },
            );
          }
          res.status(200).send();
        }
      } else if (event.type === 'invoice.payment_failed') {
        console.log('INVOICE PAYMENT FAILED SESSION');
        console.log(session);
        if (session.subscription) {
          //send an email template for failed payment on subscription
          const email = await this._emailService.sendFromTemplate(
            session.customer_email,
            'Auto Payment Failed',
            'auto-pay-declined',
            {},
          );
          res.status(200).send();
        }
      } else {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send('WEBHOOK ERROR');
      }
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async getCustomerById(req, res: Response) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const customerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(firmId);
      const customer = await this._stripeMeteredUsageService.fetchCustomer(customerId);
      const adjustedBalance = await this._stripeMeteredUsageService.getAdjustedCustomerBalance(customerId);
      res.status(StatusConstants.OK).send({ data: { customer: {...customer, adjusted_balance: adjustedBalance} } });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  async createPaymentIntent(req, res: Response) {
    try {
      const data = req.body.paymentIntent;
      const firmId = req.user.firm_access.firm_id;
      const customerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(firmId);
      const paymentIntent = await this._stripeMeteredUsageService.createPaymentIntent(
        customerId,
        data.amount,
      );
      res.status(StatusConstants.OK).send({ data: { paymentIntent } });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async updateCustomer(req, res: Response) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const changes = req.body;
      const customerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(firmId);
      const customer = await this._stripeMeteredUsageService.updateCustomer(customerId, changes);
      res.status(StatusConstants.OK).send({ data: { customer } });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async createSetupIntent(req, res: Response) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const customerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(firmId);
      const setupIntent = await this._stripeMeteredUsageService.createSetupIntent(customerId);
      res.status(StatusConstants.OK).send({ data: { setupIntent } });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async updateCreditBalance(req, res: Response) {
    try {
      const data = req.body;
      const customerBalanceTransaction =
        await this._stripeMeteredUsageService.creditCustomerBalance(data.customerId, data.amount);
      res.status(StatusConstants.OK).send({ data: customerBalanceTransaction });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async getCustomerPaymentMethods(req, res:Response) {
    try {
      const customerId = req.params.customer;
      const paymentMethods =
        await this._stripeMeteredUsageService.listPaymentMethodsForCustomer(customerId);
      res.status(StatusConstants.OK).send({ data: paymentMethods });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async updatePaymentIntentAmount(req, res:Response) {
    try {
      const id = req.params.id;
      const amount = req.body.amount;
      const paymentIntent =
        await this._stripeMeteredUsageService.updatePaymentIntentAmount(id, amount);
      res.status(StatusConstants.OK).send({ data: paymentIntent });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async handleWebhookEvent(req, res: Response) {
    const sig = req.headers['stripe-signature'];
    const payload = req.body;
    let event;
    const webhookSecret = this._configService.get<string>('STRIPE_WEBHOOK_SECRET');

    try {
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
      const data = event.data.object;
      console.log(event.type);
      console.log(data);
      // switch(event.type) {
      //   case '':

      //     break;
      // }
      
      res.status(StatusConstants.OK).send();
    } catch(err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
