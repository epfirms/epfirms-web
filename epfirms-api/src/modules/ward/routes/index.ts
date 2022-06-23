import express from 'express';
import { wardController } from '@modules/ward/controllers';

const passport = require('passport');

const wardRouter = express.Router();

wardRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) =>
  wardController.upsert(req, res),
);
wardRouter.get('/:matterID', passport.authenticate('bearer', { session: false }), (req, res) =>
  wardController.getWithMatterId(req, res),
);
wardRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) =>
  wardController.delete(req, res),
);

export { wardRouter };
