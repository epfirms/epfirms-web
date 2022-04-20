import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProbateService {

  constructor(private http : HttpClient) { }



  upsert(data) : Observable<any> {
    return this.http.post('/api/probate', data);
  }
  getProbateWithId(id) : Observable<any> {
    return this.http.get('/api/probate/' + id);
  }
  delete(id) :  Observable<any> {
    return this.http.delete('/api/probate/' + id);
  }

}
