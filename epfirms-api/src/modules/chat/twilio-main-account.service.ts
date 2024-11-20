import { Service } from 'typedi';
import twilio = require('twilio');
import { ConfigService } from '../config/config.service';
import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumber/local';
import { AccountInstance } from 'twilio/lib/rest/api/v2010/account';

/**
 * Handles main account level functionality to manage Twilio subaccounts.
 */
@Service()
export class TwilioMainAccountService {
  twilioClient: twilio.Twilio;

  account: {
    sid: string;
    authToken: string;
  };

  constructor(private _configService: ConfigService) {
    this._setTwilioCredentials();
    this.twilioClient = twilio(this.account.sid, this.account.authToken);
  }

  async createSubaccount(friendlyName: string): Promise<AccountInstance> {
    const subaccount = await this.twilioClient.api.accounts.create({ friendlyName });
    subaccount.sid;

    return Promise.resolve(subaccount);
  }

  async fetchSubaccount(sid: string): Promise<AccountInstance> {
    const subaccount = await this.twilioClient.api.accounts(sid).fetch();
    return Promise.resolve(subaccount);
  }

  async fetchAvailablePhoneNumbers(): Promise<LocalInstance[]> {
    const phoneNumberList = await this.twilioClient
      .availablePhoneNumbers('US')
      .local.list({ mmsEnabled: true, smsEnabled: true, limit: 20 });

    return Promise.resolve(phoneNumberList);
  }

  async updateSubaccountStatus(
    sid: string,
    status: 'suspended' | 'active',
  ): Promise<AccountInstance> {
    const result = await this.twilioClient.api.accounts(sid).update({ status });
    return Promise.resolve(result);
  }

  private _setTwilioCredentials() {
    this.account = {
      sid: this._configService.get<string>('TWILIO_ACCOUNT_SID'),
      authToken: this._configService.get<string>('TWILIO_AUTH_TOKEN'),
    };
  }
}
