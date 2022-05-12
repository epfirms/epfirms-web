import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirmRoleService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return of([
      'attorney',
      'associate attorney',
      'paralegal',
      'legal assistant',
      'receptionist',
      'office manager',
      'other',
    ]);
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`/api/firm/roles/${id}`);
  }
}
