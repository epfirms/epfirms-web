
import express from 'express';
import { nonUserProfileController} from '@modules/non-user-profile/controllers';

const passport = require('passport');

const nonUserProfileRouter = express.Router();

nonUserProfileRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => nonUserProfileController.create(req, res));

nonUserProfileRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => nonUserProfileController.update(req, res));
nonUserProfileRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => nonUserProfileController.getOneWithId(req, res));
nonUserProfileRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => nonUserProfileController.delete(req, res));



export { nonUserProfileRouter };



