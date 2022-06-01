import { Service } from 'typedi';
import { Database } from '@src/core/Database';
import { TwilioSubaccount } from './twilio.interface';

@Service()
export class TwilioSubaccountCredentialsService {
  constructor() {}

  async getByFirmId(firmId: string): Promise<TwilioSubaccount> {
    const { twilio_subaccount } = Database.models;
    const subaccount = await twilio_subaccount.findOne({
      where: {
        firm_id: firmId,
      },
    });
    return {
      sid: subaccount.account_sid,
      authToken: subaccount.auth_token,
      apiKey: {
        sid: subaccount.api_key,
        secret: subaccount.api_secret,
      },
      services: {
        conversations: {
          sid: subaccount.conversations_service,
        },
      },
    };
  }

  async getTwilioSubaccount(where: { account_sid?: string; firm_id?: number }): Promise<any> {
    const { twilio_subaccount } = Database.models;
    const subaccount = await twilio_subaccount.findOne({
      where,
    });
    return Promise.resolve(subaccount);
  }
}
