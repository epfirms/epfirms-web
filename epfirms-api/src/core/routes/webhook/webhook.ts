import express from 'express'
import { paymentProcessorWebhookRouter } from '@modules/payment-processor/routes';

const webhookRouter = express.Router();

webhookRouter.use('/stripe', paymentProcessorWebhookRouter);

// All routes go here 

export { webhookRouter }