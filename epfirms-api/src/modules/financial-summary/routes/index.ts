
import express from 'express';
import { financialSummaryController} from '@modules/financial-summary/controllers';

const passport = require('passport');

const financialSummaryRouter = express.Router();

financialSummaryRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => financialSummaryController.upsert(req, res));
financialSummaryRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => financialSummaryController.getAllWithId(req, res));
financialSummaryRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => financialSummaryController.delete(req, res));



export { financialSummaryRouter };



