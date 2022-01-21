import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent {
  @Input()
  set uniqueFormId(uid: string) {
    this._uid = uid;
    this.loadForm();
  }

  get uniqueFormId() {
    return this._uid;
  }

  @Input()
  set rating(value: number) {
    this._rating = value;
  }

  get rating() {
    return this._rating;
  }

  firmName: string;

  status: string;

  comment: string = '';

  private _rating: number = 0;

  private _uid: string;

  constructor(@Inject(DOCUMENT) private _document: Document, private _reviewService: ReviewService) {}

  loadForm(): void {
    this._reviewService.get(this.uniqueFormId).subscribe((res) => {
      this.status = res.review.status;
      if (this.status !== 'complete') {
        this.firmName = res.review.matter.firm.name;
        if (this.rating === 5) {
          this._reviewService
          .saveReview({ uid: this.uniqueFormId, rating: this.rating, comment: this.comment })
          .subscribe(() => {
            const googleReviewUrl = res.review.matter.firm.google_review_url;
            if (googleReviewUrl && googleReviewUrl.length) {
              this._document.location.href = googleReviewUrl;
            }
          });
        }
      }
    });
  }

  submit(): void {
    this._reviewService
      .saveReview({ uid: this.uniqueFormId, rating: this.rating, comment: this.comment })
      .subscribe((res) => {
        this.status = res.review.status;
      });
  }
}
