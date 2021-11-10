import Container from 'typedi';
import { BetaSignupController } from './beta-signup.controller';

const betaSignupController = Container.get(BetaSignupController);

export { betaSignupController };