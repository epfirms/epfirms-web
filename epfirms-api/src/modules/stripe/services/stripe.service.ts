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
      
    } catch (err) {
      console.error(err);
    }
  }
}
