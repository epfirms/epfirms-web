import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinancialSummaryService {

  constructor(private http : HttpClient) { }

  upsert(data) : Observable<any> {
    console.log("client side", data);
    return this.http.post('/api/financial-summary', data);
  }

  getWithUserId(userId) : Observable<any> {
    return this.http.get('/api/financial-summary/' + userId);
  }

  getWithJointId(jointId) : Observable<any> {
    return this.http.get('/api/financial-summary/' + jointId);
  }

}
