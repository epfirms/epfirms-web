import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(
    private http : HttpClient
  ) { }


  upsert(data) : Observable<any> {
    return this.http.post('/api/income', data);
  }
}
