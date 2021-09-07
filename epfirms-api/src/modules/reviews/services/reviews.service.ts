import { Database } from '@src/core/Database';

export class reviewsService {
    /* 
    addReviewToDatabase
        Inputs:
            comment: The comment given for the review, a String.
            rating: The Rating given, a number from 1-5, representing 1-5 stars.
            matter_id: The ID of the matter that the review is for.
        Outputs:
            N/A
        Function:
            addReview adds a review to the database, specifically to the "reviews" table, by creating an object (reviewOb), and then adding it to the table..
    */
    public static async addReviewToDatabase(comment, rating, matter_id) {
      console.log("I'm ADDING A REVIEW TO THE DATABASE BOIIIIIIIII")
      var reviewOb = {
        comment: comment,
        rating: rating,
        matter_id: matter_id,
        is_sent: 1,
        is_done: 0
      };
      const review = await Database.models.review.findOne({ where: { matter_id: matter_id } });
      if((await review) == null){
        console.log("There *isn't* one here yet?")
      } else {
        console.log("There IS one here already!!!")
      }
      const verification = await Database.models.review.create(reviewOb);
      Promise.resolve(verification);
      return verification.dataValues.token;
    }

    public static async UpdateReviewInDatabase(comment, rating, matter_id, id) {
      var reviewOb = {
        id: id,
        comment: comment,
        rating: rating,
        matter_id: matter_id,
        is_sent: 1,
        is_done: 1
      };
      const verification = await Database.models.review.update(reviewOb, {where: {id: reviewOb.id}});
    

      return Promise.resolve(verification);
      // return verification.dataValues.token;
    }

    public static async getReviewFromDatabase(matter_id): Promise<any> {
      console.log("ID: ", matter_id)
      try {
      const review = await Database.models.review.findOne({ where: { matter_id: matter_id } });
      return Promise.resolve(await (review));
    } catch {
      return null;
    }
    }
}