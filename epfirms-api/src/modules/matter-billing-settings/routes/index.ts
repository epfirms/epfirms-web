import express from 'express';
import { matterBillingSettingsController } from '@modules/matter-billing-settings/controllers';
const passport = require('passport');

const matterBillingSettingsRouter = express.Router();

// matterBillingSettingsRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.createDocument(req, res));
// matterBillingSettingsRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.getAllFirmDocuments(req, res));
// matterBillingSettingsRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.delete(req, res));
// matterBillingSettingsRouter.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.update(req, res));
// matterBillingSettingsRouter.get('/own', passport.authenticate('bearer', { session: false }), (req, res) => matterBillingSettingsController.getUserDocuments(req, res));
export { matterBillingSettingsRouter };
