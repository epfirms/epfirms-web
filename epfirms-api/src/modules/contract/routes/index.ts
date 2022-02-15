
import express from 'express';
import { contractController} from '@modules/contract/controllers';

const passport = require('passport');

const contractRouter = express.Router();

contractRouter.post('', passport.authenticate('bearer', { session: false }), (req, res) => contractController.upsert(req, res));

export { contractRouter };



