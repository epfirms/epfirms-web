
import express from 'express';
import { transactionController} from '@modules/transaction/controllers';

const passport = require('passport');

const transactionRouter = express.Router();

transactionRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => transactionController.upsert(req, res));
transactionRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => transactionController.getOneWithId(req, res));
transactionRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => transactionController.delete(req, res));



export { transactionRouter };



