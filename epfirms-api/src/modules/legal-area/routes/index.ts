import express from 'express';
import { legalAreaController } from '@modules/legal-area/controllers';
const passport = require('passport');

const legalAreaRouter = express.Router();

legalAreaRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => legalAreaController.createLegalArea(req, res));
legalAreaRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => legalAreaController.getLegalAreas(req, res));
legalAreaRouter.delete('/', passport.authenticate('bearer', { session: false }), (req, res) => legalAreaController.removeLegalArea(req, res));

export { legalAreaRouter };
