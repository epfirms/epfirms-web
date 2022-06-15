import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { StripeService } from '../services/stripe.service';
import { emailsService } from '@src/modules/emails/services/emails.service';
import { Service } from 'typedi';
import { StripeMeteredUsageService } from '../services/stripe-metered-usage.service';
import { ConfigService } from '@src/modules/config/config.service';
import { TwilioMainAccountService } from '@src/modules/chat/twilio-main-account.service';
import { TwilioSubaccountCredentialsService } from '@src/modules/chat/twilio-subaccount-credentials.service';
import { Database } from '@src/core/Database';
import { InvoiceService } from '@src/modules/invoice/services/invoice.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const stripeWebhookSig = process.env.STRIPE_WEBHOOK_KEY;
const { TWILIO_SUBACCOUNT_SID } = require('@configs/vars');

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
    private _configService: ConfigService,
    private _twilioMainAccountService: TwilioMainAccountService,
    private _twilioCredentials: TwilioSubaccountCredentialsService,
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
        res.status(200).send();
      } else if (event.type === 'invoice.finalized') {
        console.log('INVOICE FINALIZED SESSION');
        console.log(session);
        // update the invoice with the invoice id
        const updatedInvoice = await Database.models.invoice.update(
          {
            status: session.status,
            hosted_invoice_url: session.hosted_invoice_url,
            auto_advance: session.auto_advance,
          },
          { where: { invoice_id: session.id } },
        );
        res.status(200).send();
      } else if (event.type === 'invoice.paid') {
        console.log('INVOICE PAID SESSION');
        console.log(session);
        // update the invoice with the invoice id
        const updatedInvoice = await Database.models.invoice.update(
          { status: session.status },
          { where: { invoice_id: session.id } },
        );
        res.status(200).send();
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

  public async createInvoice(req, res: Response): Promise<any> {
    try {
      // get the invoice from the db
      const invoiceId = req.body.invoice_id;
      const invoice = await Database.models.invoice.findOne({ where: { id: invoiceId } });
      // if there is invoice, this process must not continue and should send an error
      if (!invoice) {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send('INVOICE NOT FOUND');
      }

      //get the firms stripe account
      const firmStripeAccount = await Database.models.stripe_account.findOne({
        where: { firm_id: invoice.firm_id },
      });

      if (!firmStripeAccount) {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send('STRIPE ACCOUNT NOT FOUND');
      }

      //get the user information
      const user = await Database.models.user.findOne({ where: { id: invoice.user_id } });

      // get the customer record else create one
      let customer = await Database.models.customer_account.findOne({
        where: { user_id: invoice.user_id },
      });

      //id to hold the customer_id that stripe uses, the object is different structure based on
      // whether or not we need to create one
      // so we use this separate var to keep track of it
      let customerID;

      if (customer) {
        customerID = customer.customer_id;
      }
      // the customerID is the stripe assigned Customer id
      // if there is no customer id, we need to create one with stripe
      // if there isn't a customer account record in the DB, create one and then create a stripe Customer
      // and update the record as well
      if (!customer) {
        customer = await stripe.customers.create({
          email: user.email,
          name: user.first_name + ' ' + user.last_name,
        });
        customerID = customer.id;
        console.log('the created stripe customer is', customer);
        // updated the customerID
        // create customer account in db
        await Database.models.customer_account.create({
          user_id: user.id,
          customer_id: customer.id,
          firm_id: invoice.firm_id,
        });
      }
      // get the transactions associated to invoice and create the stripe InvoiceItem
      const transactions = await Database.models.transaction.findAll({
        where: { invoice_id: invoice.id },
      });

      console.log('customer before transactions', customer);

      // usually, the invoice will be created from the transactions and that is the total that stripe goes by
      // they should be synced
      if (transactions.length > 0) {
        transactions.forEach(async (transaction) => {
          await stripe.invoiceItems.create({
            customer: customerID,
            amount: transaction.amount,
            currency: 'usd',
            description: transaction.description,
          });
        });
        // there are a few cases where the invoice is just created with one InvoiceItem instead of from transactions
        // a notable example of this is in the billing setup automations where there are no transactions on the matter yet
      } else if (transactions.length === 0) {
        // create the invoice item
        const invoiceItem = await stripe.invoiceItems.create({
          customer: customerID,
          amount: invoice.total * 100,
          currency: 'usd',
        });
      }
      console.log('The customer before invoice is', customer);
      //create the invoice
      const invoiceStripe = await stripe.invoices.create({
        customer: customerID,
        auto_advance: invoice.auto_advance,
        collection_method: 'send_invoice',
        description: invoice.description,
        due_date: invoice.due_date.getTime() / 1000,
        // this on behalf of is the connected firm
        // if this is setup correctly, it will load their hosted page
        // as well as their invoicing stuff
        // NOTE: there is now way to create invoice for connected account with GUI
        on_behalf_of: firmStripeAccount.account_id,
        transfer_data: {
          destination: firmStripeAccount.account_id,
        },
        // the 4% charge that we take from the connected account
        application_fee_amount: Math.floor(invoice.total * 0.04 * 100),
      });

      // update the invoice record with stripe invoice id and status
      await Database.models.invoice.update(
        {
          invoice_id: invoiceStripe.id,
          status: invoiceStripe.status,
        },
        {
          where: {
            id: invoice.id,
          },
        },
      );

      // send the invoice to the customer
      // const sentInvoice = await stripe.invoices.sendInvoice(invoiceStripe.id);

      res.status(StatusConstants.OK).send(true);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteInvoice(req, res: Response): Promise<any> {
    try {
      console.log('DELETE INVOICE REQ.BODY', req.body);
      console.log('delete invoice params', req.params);
      const invoice = await Database.models.invoice.findOne({
        where: { id: req.params.id },
      });
      if (invoice) {
        await stripe.invoices.del(invoice.invoice_id);
        await Database.models.invoice.destroy({
          where: {
            id: req.params.id,
          },
        });
      }
      res.status(StatusConstants.OK).send(true);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async finalizeInvoice(req, res: Response): Promise<any> {
    try {
      const invoice = await Database.models.invoice.findOne({
        where: { id: req.params.id },
      });
      if (invoice) {
        await stripe.invoices.finalizeInvoice(invoice.invoice_id, { auto_advance: true });
      }
      res.status(StatusConstants.OK).send(true);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  async getCustomerById(req, res: Response) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const customerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(firmId);
      const customer = await this._stripeMeteredUsageService.fetchCustomer(customerId);
      const adjustedBalance = await this._stripeMeteredUsageService.getAdjustedCustomerBalance(
        customerId,
      );
      res
        .status(StatusConstants.OK)
        .send({ data: { customer: { ...customer, adjusted_balance: adjustedBalance } } });
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
      const user = req.user;

      const customerBalanceTransaction =
        await this._stripeMeteredUsageService.creditCustomerBalance(data.customerId, data.amount);

      const subaccountCredentials = await this._twilioCredentials.getByFirmId(
        user.firm_access.firm_id,
      );
      const subaccount = await this._twilioMainAccountService.fetchSubaccount(
        TWILIO_SUBACCOUNT_SID,
      );

      // if (subaccount.status !== 'active') {
      //   await this._conversationService.updateSubaccountStatus(TWILIO_SUBACCOUNT_SID, 'active');
      // }

      res.status(StatusConstants.OK).send({ data: customerBalanceTransaction });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async getCustomerPaymentMethods(req, res: Response) {
    try {
      const customerId = req.params.customer;
      const paymentMethods = await this._stripeMeteredUsageService.listPaymentMethodsForCustomer(
        customerId,
      );
      res.status(StatusConstants.OK).send({ data: paymentMethods });
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  async updatePaymentIntentAmount(req, res: Response) {
    try {
      const id = req.params.id;
      const amount = req.body.amount;
      const paymentIntent = await this._stripeMeteredUsageService.updatePaymentIntentAmount(
        id,
        amount,
      );
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
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }
}
