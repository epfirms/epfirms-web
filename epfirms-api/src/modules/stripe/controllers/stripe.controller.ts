import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { StripeService } from '../services/stripe.service';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const passport = require('passport');
const stripeWebhookSig = process.env.STRIPE_WEBHOOK_KEY;

export class StripeController {
  constructor() {}

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
      // get the stripe account record if it exists in db
      const stripeAccount = await StripeService.getStripeAccountId(req.user.firm_access.firm_id);
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
              unit_amount: req.body.balance * 100
            },
            quantity: 1,
          }
        ],
        mode: 'payment',
        success_url: req.headers.referer,
        cancel_url: req.headers.referer
      });


      console.log("SESSION", session);
      res.status(StatusConstants.OK).send({url: session.url});
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //handler for webhook events from Stripe; might need to modulize the respective events later
  public async eventHandler(req, res : Response) : Promise<any> {
    try {
      console.log("EVENT HANDLER FOR STRIPE REACHED");

      const payload = req.body;
      console.log("payload", payload);

      const sig = req.headers['stripe-signature'];
      console.log("sig", typeof(sig), "key", typeof(stripeWebhookSig));
      let event;
      console.log("before event");
      console.log(sig, stripeWebhookSig);
      event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSig)
      console.log("after event");
      console.log("session", event);
      if (event.type === 'checkout.session.completed'){
        const session = event.data.object;
        console.log("SESSION",session);
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
