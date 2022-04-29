import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointeeSummaryService {

  constructor(private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post('/api/appointee-summary', data);
  }
  getWithUserId(userID) : Observable<any> {
    return this.http.get('/api/appointee-summary/' + userID);
  }

}
