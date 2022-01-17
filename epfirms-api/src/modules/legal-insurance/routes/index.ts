
import express from 'express';
import { legalInsuranceController} from '@modules/legal-insurance/controllers';

const passport = require('passport');

const legalInsuranceRouter = express.Router();

// legalInsuranceRouter.get('/', passport.authenticate('bearer', {session: false}, (req, res) => legalInsuranceController.get(req, res)));
legalInsuranceRouter.post('/', passport.authenticate('bearer', {session: false}, (req, res) => legalInsuranceController.upsert(req, res)));
// legalInsuranceRouter.delete('/', passport.authenticate('bearer', {session: false}, (req, res) => legalInsuranceController.delete(req, res)));

export { legalInsuranceRouter };



