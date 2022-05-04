import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  constructor(private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post('/api/referral', data);
  }

  getOneWithMatterId(matter_id) : Observable<any> {
    return this.http.get('/api/referral/' + matter_id);
  }

  getAllWithFirmId(firm_id) : Observable<any> {
    return this.http.get('/api/referral/firm/' + firm_id);
  }

  delete(id) : Observable<any> {
    return this.http.delete('/api/referral/' + id);
  }


}
