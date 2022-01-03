import express from 'express';
import { stripeController } from '../controllers';
const passport = require('passport');

const stripeRouter = express.Router();

stripeRouter.get('/integrate', passport.authenticate('bearer', { session: false }), (req, res) => stripeController.integration(req, res));
stripeRouter.get('/status', passport.authenticate('bearer', { session: false }), (req, res) => stripeController.getConnectionStatus(req, res));

export { stripeRouter };
