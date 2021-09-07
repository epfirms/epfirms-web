import express from 'express';
import { ReviewsController } from '@modules/reviews/controllers';
const passport = require('passport');

const reviewsRouter = express.Router();

// Route for adding a new review to the database.
reviewsRouter.post('/', (req, res) => ReviewsController.addReview(req, res));
// Route for updating an existing review to the database.
reviewsRouter.post('/update', (req, res) => ReviewsController.updateReview(req, res));

export { reviewsRouter };
