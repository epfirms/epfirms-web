import { Database } from '@src/core/Database';
import { Service } from 'typedi';
const { STRIPE_SECRET } = require('@configs/vars');
const bcrypt = require('bcrypt');
import Stripe from 'stripe';


@Service()
export class StripeService {
  stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(STRIPE_SECRET, {
      apiVersion: '2020-08-27',
    });
  }
  
  async createCustomer(params: Stripe.CustomerCreateParams, options: Stripe.RequestOptions): Promise<Stripe.Customer> {
    const response: Stripe.Customer = await this.stripe.customers.create(params, options);

    return response;
  }

  async getStripeAccountId(firmId): Promise<any> {
    try {
      const account = await Database.models.stripe_account.findOne({where: {firm_id: firmId}});
      return account;
    } catch (err) {
      console.error(err);
    }
  }

  async createStripeAccount(accountId, firmId): Promise<any> {
    try {

      const account = await Database.models.stripe_account.create({account_id: accountId, firm_id: firmId});

      return Promise.resolve(account);
    } catch (err) {
      console.error(err);
    }
  }

  async fufillPaymentSession(session): Promise<any> {
    try {
      const statements = await Database.models.statement.findAll({where: {stripe_session_id: session.id}});


      if (statements) {

        const updatedStatements = await Database.models.statement.update({status: "PAID"}, {where: {stripe_session_id: session.id}});
        let statement = statements[0];
        console.log("SESSION", session);
        let paymentRecord = {
          matter_id: statement.matter_id,
          amount: session.metadata.principle_charge,
          payment_type: "Private Pay",
          date: Date(),
          type: 1,
          description: "Client Portal Payment"
        }
        const payment = await Database.models.matter_billing.create(paymentRecord);
      }
      return Promise.resolve(statements);
    } catch (err) {
      console.error(err);
    }
  }

  async fufillSubscriptionSession(session): Promise<any> {
    try {
      console.log("FUFILL SUB", session);
      const customerAccount = await Database.models.customer_account.findAll({where: {stripe_session_id: session.id}});
      console.log("customerAccount", customerAccount);
      if (customerAccount) {
        const updatedAccount = await Database.models.customer_account.update({
          subscription_id: session.subscription,
          subscription_active: true
        }, {
          where: {
            stripe_session_id: session.id
          }
        });

      }
      return Promise.resolve(customerAccount);
    } catch (err) {
      console.error(err);
    }
  }
  
  // this method will find the associated customer account and update it
  // this method will also add a payment to the matterbill records
  async fufillInvoicePaymentSuccess(session): Promise<any> {
    try {
        let amountPaid = session.amount_paid / 100;
        const foundAccount = await Database.models.customer_account.findOne({where: {subscription_id: session.subscription}});
        console.log("MATTER ID", foundAccount);
        const customerAccount = await Database.models.customer_account.update({
          last_payment: amountPaid,
          last_payment_date: new Date(),
        }, {
          where: {subscription_id: session.subscription}
        });

        let paymentRecord = {
          matter_id: foundAccount.dataValues.matter_id,
          amount: amountPaid,
          type: 1,
          date: new Date(),
          description: "MONTHLY AUTO PAY"
        }

        const payment = await Database.models.matter_billing.create(paymentRecord);
        return Promise.resolve({account: customerAccount, sendEmail: foundAccount != null && foundAccount.subscription_active});
      
      
    } catch (err) {
      console.error(err);
    }
  }

  
}
