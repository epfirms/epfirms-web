import express from 'express'
import { paymentProcessorWebhookRouter } from '@modules/payment-processor/routes';
import { mailchimpWebhookRouter } from '@modules/marketing/routes';
import { stripeWebhookRouter } from '@src/modules/stripe/routes';
const webhookRouter = express.Router();

// webhookRouter.use('/stripe', paymentProcessorWebhookRouter);
webhookRouter.use('/mailchimp', mailchimpWebhookRouter);
webhookRouter.use('/stripe', stripeWebhookRouter);
// All routes go here 

export { webhookRouter }