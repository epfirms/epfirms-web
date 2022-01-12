import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  get(id: string): Observable<any> {
    return this.http.get(`/api/review/${id}`);
  }

  saveReview(reviewFields: any): Observable<any> {
    return this.http.patch(`/api/review/${reviewFields.uid}`, reviewFields);
  }
}
