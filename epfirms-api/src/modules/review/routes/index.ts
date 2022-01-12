import express from 'express';
import { reviewController } from '@src/modules/review/controllers';
const passport = require('passport');

const reviewRouter = express.Router();

// Route for adding a new review to the database.
reviewRouter.get('/:uid', (req, res) => reviewController.get(req, res));

reviewRouter.post('/', passport.authenticate('bearer', { session: false }), (req, res) => reviewController.add(req, res));

// Route for updating an existing review to the database.
reviewRouter.patch('/:uid', (req, res) => reviewController.update(req, res));

export { reviewRouter };
