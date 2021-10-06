import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberService {
  constructor(private _http: HttpClient) { }

  getAll(): Observable<any> {
    return this._http.get<any>('/api/user/family-member').pipe();
  }

  addFamilyMember(familyMember): Observable<any> {
    return this._http.post<any>('/api/user/family-member', familyMember).pipe();
  }

  deleteFamilyMember(familyMemberId: number): Observable<any> {
    return this._http.delete<any>(`/api/user/family-member/${familyMemberId}`);
  }

  addFamilyMemberForUser(userId: number, familyMember): Observable<any> {
    return this._http.post<any>(`/api/user/${userId}/family-member`, familyMember);
  }

  getByUserId(id: number): Observable<any> {
    return this._http.get<any>(`/api/user/family-member/${id}`);
  }

  deleteFamilyMemberById(userId: number, familyMemberId: number): Observable<any> {
    return this._http.delete<any>(`/api/user/${userId}/family-member/${familyMemberId}`);
  }
}
