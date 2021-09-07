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
}
