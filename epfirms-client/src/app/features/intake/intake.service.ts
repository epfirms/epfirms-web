import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {

  constructor(private http : HttpClient) { }

  getOneWithMatterId(id) : Observable<any> {
    return this.http.get(`/api/intake/${id}`);
  }

  upsert(data) : Observable<any> {
    return this.http.post(`/api/intake`, data);
  }

  delete(id) : Observable<any> {
    return this.http.delete(`/api/intake/${id}`);
  }

  
}
