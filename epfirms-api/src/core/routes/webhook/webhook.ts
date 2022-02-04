import express from 'express'
import { paymentProcessorWebhookRouter } from '@modules/payment-processor/routes';
import { mailchimpWebhookRouter } from '@modules/marketing/routes';
const webhookRouter = express.Router();

// webhookRouter.use('/stripe', paymentProcessorWebhookRouter);
webhookRouter.use('/mailchimp', mailchimpWebhookRouter);

// All routes go here 

export { webhookRouter }