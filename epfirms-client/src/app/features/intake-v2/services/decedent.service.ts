import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecedentService {

  constructor(private http : HttpClient) { }

  getDecedentWithMatterId(matterId : number) : Observable<any> {
    return this.http.get<any>('/api/decedent/' + matterId);
  }

  upsert(data) : Observable<any> {
    return this.http.post<any>('/api/decedent', data);
  }

  delete(id) : Observable<any> {
    return this.http.delete<any>('/api/decedent/' + id);
  }


}
