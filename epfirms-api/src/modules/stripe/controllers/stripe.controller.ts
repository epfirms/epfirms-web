import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { StripeService } from '../services/stripe.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const passport = require('passport');
const stripeWebhookSig = process.env.STRIPE_WEBHOOK_KEY;

export class StripeController {
  constructor() {}

  //IMPORTANT: This is how we collect fees from the customers on every transaction.
  // c: what we actually charge the customer
  // p: the principle amount of the charge
  // fixedFee: the fixed fee from stripe. This is currently $0.30
  // fixedPercent: the percent fee from stripe.
  // revenuePercent: the percent we want to charge and collect.
  // charge = (p + fixedFee)/(1-(fixedPercent + revenuePercent)) aka the fees amount
  private _calcFees(p): any {
    let c = 0;
    const fixedFee = 0.30;
    const fixedPercent = 0.029;
    const revenuePercent = 0.01;
    c = (p + fixedFee) / (1-(fixedPercent + revenuePercent));
    // get the fees only since it will be in an itemized charge
    let fee = c - p;
    // convert to cents for stripe and return
    return (Math.round(100* fee)/100) / 0.01
  }

  private _roundToCurrency(n): number {
    return Math.round(100* n) / 100
  }

  //takes the stripe accountId and origin or request and creates the secure link to setup
  //stripe integration
  private _generateAccountLink(accountID, origin) {


  return stripe.accountLinks
    .create({
      type: "account_onboarding",
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
      if (req.user.firm_access == null){
        firm_id = req.user.client_access[0].id;
      }
      else {
        firm_id = req.user.firm_access.firm_id
      }
      // get the stripe account record if it exists in db
      const stripeAccount = await StripeService.getStripeAccountId(firm_id);
      // if there is an existing stripe account, use the stripe api to compare it to connected
      // accounts.
      if (stripeAccount !== null){

        const connectedAccounts = await stripe.accounts.list();

        let match : boolean = false;

        connectedAccounts.data.forEach(account => {
          if (stripeAccount.account_id === account.id){
            match = true;
          }
        });
        // send the response and whether or not there was a connection
        res.status(StatusConstants.OK).send({isConnected: match});
      }
      else {
        res.status(StatusConstants.OK).send({isConnected: false});
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
      const existing_account = await StripeService.getStripeAccountId(req.user.firm_access.firm_id);

      // if there is no existing account_id then create a new one and save to DB
      if (existing_account === null){
        const account = await stripe.accounts.create({
          type: 'standard',
        });
        const createEntry = await StripeService.createStripeAccount(account.id, req.user.firm_access.firm_id);
        const accountLinkURL = await this._generateAccountLink(account.id, origin);
        res.send({ url: accountLinkURL });
      }
      // if the db already has an account_id for the firm just generate the account linking url
      else {
        const accountLinkURL = await this._generateAccountLink(existing_account.dataValues.account_id, origin);
        res.send({ url: accountLinkURL });
      }




    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async createPaymentSession(req, res : Response) : Promise<any> {
    try {
      let amount = this._roundToCurrency(req.body.balance);
      // create stripe checkout session
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'FIRM NAME BILLING VAR'
              },
              //conversion to cents since Stripe API uses this; might need a better way
              unit_amount_decimal: amount / 0.01,
              // recurring: {
              //   interval: "month",
              //   interval_count: 1,
              // },
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Processing Fee"
              },
              unit_amount_decimal: (this._calcFees(amount))
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: req.headers.referer,
        cancel_url: req.headers.referer,
        metadata: {
          principle_charge: req.body.balance
        }
      });


      
      res.status(StatusConstants.OK).send({url: session.url, session_id: session.id});
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //handler for webhook events from Stripe; might need to modulize the respective events later
  public async eventHandler(req, res : Response) : Promise<any> {
    try {


      const payload = req.body;


      const sig = req.headers['stripe-signature'];

      let event;


      event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSig)


      if (event.type === 'checkout.session.completed'){
        const session = event.data.object;
        const fufillment = await StripeService.fufillPaymentSession(session);

        res.status(200).send();
      }
      else {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send("WEBHOOK ERROR");
      }
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }


}
