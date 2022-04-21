import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialSummaryService {

  constructor(private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post('/api/v1/financial-summary', data);
  }

  getWithUserId(userId) : Observable<any> {
    return this.http.get('/api/v1/financial-summary/' + userId);
  }

  getWithJointId(jointId) : Observable<any> {
    return this.http.get('/api/v1/financial-summary/' + jointId);
  }

}
