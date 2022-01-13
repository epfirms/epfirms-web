import express from 'express';
import { reviewController } from '@src/modules/review/controllers';
const passport = require('passport');

const reviewRouter = express.Router();

reviewRouter.get('/', passport.authenticate('bearer', { session: false }), (req, res) => reviewController.getByFirm(req, res));

reviewRouter.get('/:uid', (req, res) => reviewController.get(req, res));

reviewRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => reviewController.add(req, res));

reviewRouter.patch('/:uid', (req, res) => reviewController.update(req, res));

export { reviewRouter };
