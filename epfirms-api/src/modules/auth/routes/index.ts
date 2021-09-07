import express from 'express';
import { authController } from '@modules/auth/controllers';
const passport = require('passport');

const authRouter = express.Router();

authRouter.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => authController.getCurrentUserDetails(req, res)
);

authRouter.post('/', (req, res) => authController.login(req, res));
authRouter.post('/VerifyEmail', (req, res) => authController.verifyEmailToken(req, res));

export { authRouter };
