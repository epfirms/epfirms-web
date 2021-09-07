import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointeeService {
  constructor(private _http: HttpClient) { }

  getAll(): Observable<any> {
    return this._http.get<any>('/api/user/appointee').pipe();
  }

  addAppointee(appointee): Observable<any> {
    return this._http.post<any>('/api/user/appointee', appointee).pipe();
  }
}
