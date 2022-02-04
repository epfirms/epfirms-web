import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');




export class StripeService {
  public static async getStripeAccountId(firmId): Promise<any> {
    try {
      const account = await Database.models.stripe_account.findOne({where: {firm_id: firmId}});
      return account;
    } catch (err) {
      console.error(err);
    }
  }

  public static async createStripeAccount(accountId, firmId): Promise<any> {
    try {

      const account = await Database.models.stripe_account.create({account_id: accountId, firm_id: firmId});

      return Promise.resolve(account);
    } catch (err) {
      console.error(err);
    }
  }

  public static async fufillPaymentSession(session): Promise<any> {
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

  public static async fufillSubscriptionSession(session): Promise<any> {
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
  public static async fufillInvoicePaymentSuccess(session): Promise<any> {
    try {
        let amountPaid = session.amount_paid / 100;
        const matterId = await Database.models.customer_account.findOne({where: {subscription_id: session.subscription}});
        console.log("MATTER ID", matterId);
        const customerAccount = await Database.models.customer_account.update({
          last_payment: amountPaid,
          last_payment_date: new Date(),
        }, {
          where: {subscription_id: session.subscription}
        });

        let paymentRecord = {
          matter_id: matterId.dataValues.matter_id,
          amount: amountPaid,
          type: 1,
          date: new Date(),
          description: "MONTHLY AUTO PAY"
        }

        const payment = await Database.models.matter_billing.create(paymentRecord);
        return Promise.resolve(customerAccount);
      
      
    } catch (err) {
      console.error(err);
    }
  }

  
}
