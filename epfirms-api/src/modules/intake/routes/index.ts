
import express from 'express';
import { intakeController} from '@modules/intake/controllers';

const passport = require('passport');

const intakeRouter = express.Router();

intakeRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => intakeController.upsert(req, res));
intakeRouter.get('/:matter_id', passport.authenticate('bearer', { session: false }), (req, res) => intakeController.getOneWithMatterId(req, res));
intakeRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => intakeController.delete(req, res));

// automation route

intakeRouter.put('/automation', passport.authenticate('bearer', { session: false }), (req, res) => intakeController.updateReviewStatus(req, res));


export { intakeRouter };



