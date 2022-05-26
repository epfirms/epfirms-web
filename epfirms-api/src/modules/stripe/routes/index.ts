import express from 'express';
import { stripeController } from '../controllers';
const passport = require('passport');

const stripeRouter = express.Router();
stripeRouter.get('/integrate', passport.authenticate('bearer', { session: false }), (req, res) =>
  stripeController.integration(req, res),
);

stripeRouter.get('/status', passport.authenticate('bearer', { session: false }), (req, res) =>
  stripeController.getConnectionStatus(req, res),
);

stripeRouter.post('/payment', passport.authenticate('bearer', { session: false }), (req, res) =>
  stripeController.createPaymentSession(req, res),
);

stripeRouter.post(
  '/subscription',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.createSubscriptionSession(req, res),
);

stripeRouter.post(
  '/payment-intent',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.createPaymentIntent(req, res),
);

stripeRouter.post(
  '/credit-balance',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.updateCreditBalance(req, res),
);

stripeRouter.get('/customer', passport.authenticate('bearer', { session: false }), (req, res) =>
  stripeController.getCustomerById(req, res),
);

stripeRouter.post(
  '/setup-intent',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.createSetupIntent(req, res),
);

stripeRouter.get(
  '/customer/:customer/payment-methods',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.getCustomerPaymentMethods(req, res),
);

stripeRouter.post(
  '/payment-intent/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.updatePaymentIntentAmount(req, res),
);

stripeRouter.post(
  '/customer/:id',
  passport.authenticate('bearer', { session: false }),
  (req, res) => stripeController.updateCustomer(req, res),
);


const stripeWebhookRouter = express.Router();

stripeWebhookRouter.post('/', express.raw({type: 'application/json'}), (req, res) => stripeController.handleWebhookEvent(req, res));

export { stripeRouter, stripeWebhookRouter };
