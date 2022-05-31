import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '@app/core/interfaces/Ward';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WardService {
  constructor(private http: HttpClient) {}

  getWardWithMatterId(id: number): Observable<any> {
    return this.http.get(`/api/ward/${id}`);
  }
  upsert(ward: Ward): Observable<any> {
    return this.http.post('/api/ward', ward);
  }
  update(ward: Ward): Observable<any> {
    return this.http.put(`/api/ward/${ward.id}`, ward);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`/api/ward/${id}`);
  }
}
