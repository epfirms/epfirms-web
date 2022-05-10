
import express from 'express';
import { decedentController} from '@modules/decedent/controllers';

const passport = require('passport');

const decedentRouter = express.Router();

decedentRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => decedentController.upsert(req, res));
decedentRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => decedentController.getAllWithId(req, res));
decedentRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => decedentController.delete(req, res));



export { decedentRouter };



