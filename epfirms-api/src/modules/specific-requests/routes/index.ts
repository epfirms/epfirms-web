
import express from 'express';
import { specificRequestsController} from '@modules/specific-requests/controllers';

const passport = require('passport');

const specificRequestsRouter = express.Router();

specificRequestsRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => specificRequestsController.upsert(req, res));
specificRequestsRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => specificRequestsController.getAllWithId(req, res));
specificRequestsRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => specificRequestsController.delete(req, res));



export { specificRequestsRouter };



