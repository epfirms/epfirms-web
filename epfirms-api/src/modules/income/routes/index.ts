
import express from 'express';
import { incomeController} from '@modules/income/controllers';

const passport = require('passport');

const incomeRouter = express.Router();

incomeRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => incomeController.upsert(req, res));
incomeRouter.get('/:user_id', passport.authenticate('bearer', { session: false }), (req, res) => incomeController.getWithUserId(req, res));


export { incomeRouter };



