import express from 'express';
import { betaSignupController } from '@modules/beta-signup/controllers';

const betaSignupRouter = express.Router();

betaSignupRouter.post('/', (req, res) => betaSignupController.signup(req, res));

export { betaSignupRouter };
