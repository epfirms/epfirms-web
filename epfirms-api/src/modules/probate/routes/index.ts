
import express from 'express';
import { probateController} from '@modules/probate/controllers';

const passport = require('passport');

const probateRouter = express.Router();

probateRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => probateController.upsert(req, res));
probateRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => probateController.getAllWithId(req, res));
probateRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => probateController.delete(req, res));



export { probateRouter };



