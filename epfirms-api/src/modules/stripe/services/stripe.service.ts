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
      console.log(accountId, firmId);
      const account = await Database.models.stripe_account.create({account_id: accountId, firm_id: firmId});
      console.log("created account", account);
      return Promise.resolve(account);
    } catch (err) {
      console.error(err);
    }
  }

  public static async fufillPaymentSession(session): Promise<any> {
    try {
      const statements = await Database.models.statement.findAll({where: {stripe_session_id: session.id}});
      console.log("SHOULD BE FUFILL SERVICE");
      console.log("FUFILL", statements);
      if (statements) {
        console.log("ABLE TO FIND MATCHING SESSIONS\n\n\n");
        const updatedStatements = await Database.models.statement.update({status: "PAID"}, {where: {stripe_session_id: session.id}});
        let statement = statements[0];
        let paymentRecord = {
          matter_id: statement.matter_id,
          amount: session.amount_total / 100,
          payment_type: "Private Pay",
          date: Date(),
          type: 1
        }
        const payment = await Database.models.matter_billing.create(paymentRecord);
      }
      return Promise.resolve(statements);
    } catch (err) {
      console.error(err);
    }
  }
}
