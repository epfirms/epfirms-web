import express from 'express';
import {matterBillingController} from '@modules/matter-billing/controllers';
const passport = require('passport');


const matterBillingRouter = express.Router();

matterBillingRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingController.create(req, res));
matterBillingRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingController.getAllByMatterId(req, res));
matterBillingRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingController.delete(req, res));
matterBillingRouter.put('/', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingController.update(req, res));

export {matterBillingRouter}
