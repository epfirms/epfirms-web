
import express from 'express';
import { appointeeSummaryController} from '@modules/appointee-summary/controllers';

const passport = require('passport');

const appointeeSummaryRouter = express.Router();

appointeeSummaryRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => appointeeSummaryController.upsert(req, res));
appointeeSummaryRouter.get('/:user_id', passport.authenticate('bearer', { session: false }), (req, res) => appointeeSummaryController.getWithUserId(req, res));
appointeeSummaryRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => appointeeSummaryController.delete(req, res));



export { appointeeSummaryRouter };



