import express from 'express';
import {matterActivityController} from '@modules/matter-activity/controllers';
const passport = require('passport');


const matterActivityRouter = express.Router();

matterActivityRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => matterActivityController.create(req, res));
matterActivityRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => matterActivityController.getAllByMatterId(req, res));
matterActivityRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterActivityController.delete(req, res));
matterActivityRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterActivityController.update(req, res));




export {matterActivityRouter}
