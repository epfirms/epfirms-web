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

authRouter.get('/password/:user_id', (req, res) => authController.verifyPasswordToken(req, res));
authRouter.post('/password', (req, res) => authController.updatePassword(req, res));
export { authRouter };
