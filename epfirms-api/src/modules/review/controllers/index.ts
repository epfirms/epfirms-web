import Container from 'typedi';
import { ReviewController } from './review.controller';

const reviewController = Container.get(ReviewController);

export { reviewController };