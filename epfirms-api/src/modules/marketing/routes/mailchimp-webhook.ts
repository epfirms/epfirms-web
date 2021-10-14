import express from 'express';
import { mailchimpWebhookController } from '../controllers';

const mailchimpWebhookRouter = express.Router();

mailchimpWebhookRouter.get('/', (req, res) => mailchimpWebhookController.verifyEndpoint(req, res));
mailchimpWebhookRouter.post('/', (req, res) => mailchimpWebhookController.createExternalLead(req, res));

export { mailchimpWebhookRouter };
