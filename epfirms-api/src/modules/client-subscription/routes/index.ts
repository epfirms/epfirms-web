
import express from 'express';
import { clientSubscriptionController} from '@modules/client-subscription/controllers';

const passport = require('passport');

const clientSubscriptionRouter = express.Router();

clientSubscriptionRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => clientSubscriptionController.upsert(req, res));
clientSubscriptionRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => clientSubscriptionController.getOneWithId(req, res));
clientSubscriptionRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => clientSubscriptionController.delete(req, res));



export { clientSubscriptionRouter };



