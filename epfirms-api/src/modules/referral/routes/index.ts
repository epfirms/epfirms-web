
import express from 'express';
import { referralController} from '@modules/referral/controllers';

const passport = require('passport');

const referralRouter = express.Router();

referralRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => referralController.upsert(req, res));
referralRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => referralController.getOneWithMatterId(req, res));
referralRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => referralController.delete(req, res));
referralRouter.get('/firm/:firm_id', passport.authenticate('bearer', { session: false }), (req, res) => referralController.getAllWithFirmId(req, res));



export { referralRouter };



