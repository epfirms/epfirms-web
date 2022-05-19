import express from 'express';
import { matterBillingSettingsController } from '@modules/matter-billing-settings/controllers';
const passport = require('passport');

const matterBillingSettingsRouter = express.Router();

matterBillingSettingsRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.create(req, res));
matterBillingSettingsRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.getWithMatterId(req, res));
// matterBillingSettingsRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.delete(req, res));
// matterBillingSettingsRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.update(req, res));
// matterBillingSettingsRouter.get('/own', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.getUserDocuments(req, res));
export { matterBillingSettingsRouter };
