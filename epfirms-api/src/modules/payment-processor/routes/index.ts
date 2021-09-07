import express from 'express';
import { paymentProcessorWebhookController } from '@modules/payment-processor/controllers';
const passport = require('passport');

const paymentProcessorWebhookRouter = express.Router();

// userRouter.get('/',
//   (req, res) => paymentProcessorController.getUser(req, res)
// )

paymentProcessorWebhookRouter.post('/',
  (req, res) => paymentProcessorWebhookController.handleInvoiceWebhook(req, res)
)

// public async InitializeGet() {
//   this.router.get(this.path, passport.authenticate('bearer', { session: false, failureRedirect: '/login'}), this.getService.bind(this)).bind(this);
// }

export { paymentProcessorWebhookRouter };