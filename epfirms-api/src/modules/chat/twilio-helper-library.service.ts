import { Inject, Service } from 'typedi';
import twilio = require('twilio');
import AccessToken = require('twilio/lib/jwt/AccessToken');
import { ConfigService } from '../config/config.service';
import { TWILIO_SUBACCOUNT_TOKEN } from './twilio-subaccount.service';
import { TwilioSubaccount } from './twilio.interface';
import { NewKeyInstance, NewKeyListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/newKey';

@Service()
export class TwilioHelperLibraryService {
  twilioClient: twilio.Twilio;

  account: {
    sid: string;
    authToken: string;
  };

  constructor(@Inject(TWILIO_SUBACCOUNT_TOKEN) protected subaccount: TwilioSubaccount, private _configService: ConfigService) {
    this._setTwilioCredentials();
    this.twilioClient = twilio(this.account.sid, this.account.authToken, {
      accountSid: this.subaccount.sid,
    });
  }

  /**
   * Creates a grant for a client to use Chat as a given user, on a given device.
   */
  async createChatGrant(): Promise<AccessToken.ChatGrant> {
    const chatGrant = new AccessToken.ChatGrant({
      serviceSid: this.subaccount.services.conversations.sid,
    });

    return Promise.resolve(chatGrant);
  }

  /**
   * Creates an access token for use with twilio SDK client.
   */
  async createAccessToken(
    identity: string,
    grants: {
      chat: AccessToken.ChatGrant;
    },
  ): Promise<AccessToken> {
    const token = new AccessToken(
      this.subaccount.sid,
      this.subaccount.apiKey.sid,
      this.subaccount.apiKey.secret,
      {
        identity: identity,
        ttl: 43200,
      },
    );

    token.addGrant(grants.chat);
    return Promise.resolve(token);
  }

  private _setTwilioCredentials() {
    this.account = {
      sid: this._configService.get<string>('TWILIO_ACCOUNT_SID'),
      authToken: this._configService.get<string>('TWILIO_AUTH_TOKEN'),
    };
  }

  async _createSubaccountApiKey(opts?: NewKeyListInstanceCreateOptions): Promise<NewKeyInstance> {
    const key = await this.twilioClient.newKeys.create(opts);
    return key;
  }

  async _deleteSubaccountApiKey(keySid: string): Promise<boolean> {
    const removed = await this.twilioClient.keys(keySid).remove();
    return removed
  }
}
