import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmRoleService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get('/api/firm/roles');
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`/api/firm/roles/${id}`);
  }
}
