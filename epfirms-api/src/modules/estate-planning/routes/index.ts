
import express from 'express';
import { estatePlanningController} from '@modules/estate-planning/controllers';

const passport = require('passport');

const estatePlanningRouter = express.Router();

estatePlanningRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => estatePlanningController.upsert(req, res));
estatePlanningRouter.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => estatePlanningController.getAllWithId(req, res));
estatePlanningRouter.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => estatePlanningController.delete(req, res));



export { estatePlanningRouter };



