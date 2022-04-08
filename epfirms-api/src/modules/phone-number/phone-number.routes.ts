import express from 'express';
import Container from 'typedi';
import { PhoneNumberController } from './phone-number.controller';
const passport = require('passport');

const phoneNumberRouter = express.Router();
const phoneNumberController = Container.get(PhoneNumberController);

phoneNumberRouter.get('/:number', passport.authenticate('bearer', { session: false }), (req, res) =>
  phoneNumberController.getPhoneNumber(req, res),
);

export { phoneNumberRouter };
