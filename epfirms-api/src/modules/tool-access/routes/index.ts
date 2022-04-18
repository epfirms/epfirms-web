
import express from 'express';
import { toolAccessController} from '@modules/tool-access/controllers';

const passport = require('passport');

const toolAccessRouter = express.Router();

// toolAccessRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => toolAccessController.upsert(req, res));
// toolAccessRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => toolAccessController.getAllWithId(req, res));



export { toolAccessRouter };



