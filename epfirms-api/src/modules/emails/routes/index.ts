import express from 'express';
import { EmailsController } from '@modules/emails/controllers';
const passport = require('passport');

const emailsRouter = express.Router();

emailsRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => EmailsController.sendFirmConfirmation(req, res));
emailsRouter.get('/verify', passport.authenticate('bearer', { session: false }), (req, res) => EmailsController.verify(req, res));
// Sending an email, requesting the client review the firm.
emailsRouter.post('/sendReview', passport.authenticate('bearer', { session: false }), (req, res) => EmailsController.reviewFeedback(req, res));
emailsRouter.post('/forgot-password', (req, res) => EmailsController.forgotPassword(req, res));
export { emailsRouter };
