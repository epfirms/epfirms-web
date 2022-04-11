
import express from 'express';
import { excludedChildrenController} from '@modules/excluded-children/controllers';

const passport = require('passport');

const excludedChildrenRouter = express.Router();

excludedChildrenRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => excludedChildrenController.upsert(req, res));
excludedChildrenRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => excludedChildrenController.getAllWithId(req, res));
excludedChildrenRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => excludedChildrenController.delete(req, res));



export { excludedChildrenRouter };



