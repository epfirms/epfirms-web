import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {

  constructor(private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post("/api/customer-account/", data);
  }

  get(matterId) : Observable<any> {
    return this.http.get(`/api/customer-account/${matterId}`);
  }
}
