import { Response, Request } from 'express';
import { reviewsService } from '@modules/reviews/services/reviews.service';


const passport = require('passport');
export class reviewsController {
constructor(

) {}

    /* 
    addReview
        Inputs:
            req: The body of the request must contain an object that has reviewComment, reviewRating, and matter_id on it.
                req.body.reviewComment: The comment given for the review, a String.
                req.body.reviewRating: The Rating given, a number from 1-5, representing 1-5 stars.
                req.body.matter_id: The ID of the matter that the review is for.
        Outputs:
            N/A
        Function:
            addReview adds a review to the database, specifically to the "reviews" table, by making a call to the reviewsService.
    */
    public async addReview(req, res) {
        console.log("Adding Review to Database", req.body);
        reviewsService.addReviewToDatabase(req.body.reviewComment,req.body.reviewRating, req.body.matter_id)
        return
    }

    public async updateReview(req,res) {
        console.log("Updating Review in Database", req.body);
        reviewsService.UpdateReviewInDatabase(req.body.reviewComment,req.body.reviewRating, req.body.matter_id, req.body.id)
    }

    public static async getReview(matter_id): Promise<any> {
        console.log("ID: ", matter_id);
        const review = reviewsService.getReviewFromDatabase(matter_id);
        return Promise.resolve(await (review));
      }
}