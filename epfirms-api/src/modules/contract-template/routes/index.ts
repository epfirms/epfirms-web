
import express from 'express';
import { contractTemplateController} from '@modules/contract-template/controllers';

const passport = require('passport');

const contractTemplateRouter = express.Router();

// contractTemplateRouter.get('/', passport.authenticate('bearer', {session: false}), (req, res) => contractTemplateController.getWithId(req, res));
contractTemplateRouter.post('/', passport.authenticate('bearer', {session: false}), (req, res) => contractTemplateController.upsert(req, res));

export { contractTemplateRouter };



