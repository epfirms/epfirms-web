
import express from 'express';
import { appointeeController} from '@modules/appointee/controllers';

const passport = require('passport');

const appointeeRouter = express.Router();

appointeeRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => appointeeController.upsert(req, res));
appointeeRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => appointeeController.getAllWithId(req, res));
appointeeRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => appointeeController.delete(req, res));



export { appointeeRouter };



