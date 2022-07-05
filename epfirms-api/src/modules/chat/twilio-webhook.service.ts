import { Inject, Service } from 'typedi';
import twilio = require('twilio');
import AccessToken = require('twilio/lib/jwt/AccessToken');
import { ConfigService } from '../config/config.service';
import { TwilioSubaccountService, TWILIO_SUBACCOUNT_TOKEN } from './twilio-subaccount.service';
import { TwilioSubaccount } from './twilio.interface';
import { NewKeyInstance, NewKeyListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/newKey';
import { StripeMeteredUsageService } from '../stripe/services/stripe-metered-usage.service';
import { TwilioMainAccountService } from './twilio-main-account.service';
import { TwilioSubaccountCredentialsService } from './twilio-subaccount-credentials.service';

/**
 * Handle pre/post webhooks for Twilio Conversations service.
 */
@Service()
export class TwilioWebhookService {
  constructor(
    private _twilioSubaccountCredentials: TwilioSubaccountCredentialsService,
    private _stripeMeteredUsageService: StripeMeteredUsageService,
    private _twilioMainAccountService: TwilioMainAccountService,
    private _configService: ConfigService,
  ) {}

  async preMessageAdd(data) {
      const hasAvailableFunds = await this._verifyAvailableFunds(data);
      if (!hasAvailableFunds) {
        const account = await this._twilioMainAccountService.updateSubaccountStatus(
          data.AccountSid,
          'suspended',
        );

        return Promise.reject(new Error('Pre-webhook error: Not enough funds.'));
      }
      
      Promise.resolve();

    return Promise.reject(new Error('Pre-webhook error'));
  }

  private async _verifyAvailableFunds(data): Promise<boolean> {
    const stripeMessagingPrice = this._configService.get<string>('STRIPE_PRICE_MESSAGING_SMS');

    const twilioSubaccount = await this._twilioSubaccountCredentials.getTwilioSubaccount({
      account_sid: data.AccountSid,
    });

    const stripeCustomerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(
      twilioSubaccount.firm_id,
    );

    const hasFunds = await this._stripeMeteredUsageService.hasFundsForItem(
      stripeCustomerId,
      stripeMessagingPrice,
    );

    return Promise.resolve(hasFunds);
  }
}
