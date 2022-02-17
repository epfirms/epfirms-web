
import express from 'express';
import { contractController} from '@modules/contract/controllers';

const passport = require('passport');

const contractRouter = express.Router();

contractRouter.post('', passport.authenticate('bearer', { session: false }), (req, res) => contractController.upsert(req, res));
contractRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => contractController.getWithMatterId(req, res));

export { contractRouter };



