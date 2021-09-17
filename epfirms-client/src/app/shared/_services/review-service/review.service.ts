import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private _http: HttpClient,
    ) { }

  updateReview(reviewComment, reviewRating, id) {
    return this._http.post<any>('/api/reviews/update', {
      reviewComment: reviewComment,
      reviewRating: reviewRating,
      id: id,
   });
  }
}
