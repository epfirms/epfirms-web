import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '@app/core/interfaces/Ward';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WardService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<any> {
    return this.http.get(`/api/wards/${id}`);
  }
  create(ward: Ward): Observable<any> {
    return this.http.post('/api/wards', ward);
  }
  update(ward: Ward): Observable<any> {
    return this.http.put(`/api/wards/${ward.id}`, ward);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`/api/wards/${id}`);
  }
}
