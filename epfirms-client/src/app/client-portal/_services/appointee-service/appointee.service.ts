import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointeeService {
  constructor(private _http: HttpClient) { }

  getByUserId(userId: number): Observable<any> {
    return this._http.get<any>(`/api/user/${userId}/appointee`).pipe();
  }

  getAll(): Observable<any> {
    return this._http.get<any>('/api/user/appointee').pipe();
  }

  addAppointee(userId: number, appointee): Observable<any> {
    return this._http.post<any>(`/api/user/${userId}/appointee`, appointee).pipe();
  }

  updateAppointee(appointeeId: number, appointee): Observable<any> {
    return this._http.patch<any>(`/api/user/appointee/${appointeeId}`, appointee);
  }

  deleteAppointee(userId: number, familyMemberId: number): Observable<any> {
    return this._http.delete<any>(`/api/user/${userId}/appointee/${familyMemberId}`);
  }
}
