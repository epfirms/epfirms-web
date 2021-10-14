import express from 'express';
import { mailchimpWebhookController } from '../controllers';

const mailchimpWebhookRouter = express.Router();

mailchimpWebhookRouter.post('/', (req, res) => mailchimpWebhookController.createExternalLead(req, res));

export { mailchimpWebhookRouter };
