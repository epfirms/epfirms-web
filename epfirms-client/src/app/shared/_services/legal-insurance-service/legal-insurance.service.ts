import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LegalInsuranceService {

  constructor(
    private http : HttpClient
  ) { }

  create(data) : Observable<any> {
    console.log(data)
    return this.http.post('/api/legal-insurance/', data);
  }
}
