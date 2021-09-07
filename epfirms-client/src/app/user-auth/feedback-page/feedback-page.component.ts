import { Component, OnInit } from '@angular/core';
import { ReviewService } from '@app/shared/_services/review-service/review.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {

  constructor(
    private _reviewService: ReviewService,
    private _route: ActivatedRoute
  ) { }
  comment: String;
  rating: String;
  result: any;
  buttonBool: Boolean = false;
  matter_id: any;
  id: any;

  ngOnInit(): void {
    // Grabs the id from the URL and stores it into this.matter_id.
    this._route.queryParams
      .subscribe(params => {
        console.log(params);
        this.id = params.id;
      }
    );
  }


  /*
    sendReviewToDatabase
      Inputs:
        this.comment:
        this.rating:
        this.matter_id:
      Outputs:
        this.buttonBool: The bool that controls whether the button for sending a review to the database
        is useable or not, and replaces it with "Review Sent".
      Function:
        Checks to make sure that the comment and rating have been chosen/written and then parses down the rating into just a number, before
        calling the local reviewService to actually work with the back-end.
  */
  sendReviewToDatabase(): void {
    if (this.comment.length > 0 && this.rating.length > 0) {
      this.buttonBool = true;
      var reviewRatingNumber = this.rating.charAt(0);
      var reviewComment = this.comment;
      this._reviewService.updateReview(reviewComment, reviewRatingNumber, this.id).subscribe(result => {
        console.log("Result: " + result.success);
        this.result = result.success
      });
    }
  }

}
