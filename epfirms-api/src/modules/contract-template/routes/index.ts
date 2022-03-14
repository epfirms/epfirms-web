
import express from 'express';
import { contractTemplateController} from '@modules/contract-template/controllers';

const passport = require('passport');

const contractTemplateRouter = express.Router();

contractTemplateRouter.get('/firm', passport.authenticate('bearer', {session: false}), (req, res) => contractTemplateController.getAllWithFirmId(req, res));
contractTemplateRouter.post('/', passport.authenticate('bearer', {session: false}), (req, res) => contractTemplateController.upsert(req, res));
contractTemplateRouter.delete('/:id', passport.authenticate('bearer', {session: false}), (req, res) => contractTemplateController.delete(req, res));
export { contractTemplateRouter };



