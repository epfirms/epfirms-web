import { stripeController } from '@src/modules/stripe/controllers';
import express from 'express'


const stripeWebhookRouter = express.Router();


// this handles the routing for the stripe events from webhooks
stripeWebhookRouter.post('/events', express.raw({type: 'application/json'}), (req, res) => stripeController.eventHandler(req, res));


export {stripeWebhookRouter};
