import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor( private http : HttpClient) { }

  upsert(data) : Observable<any> {
    return this.http.post('/api/contract', data);
  }

  getWithMatterId(id) : Observable<any> {
    return this.http.get(`/api/contract/${id}`);
  }
}
