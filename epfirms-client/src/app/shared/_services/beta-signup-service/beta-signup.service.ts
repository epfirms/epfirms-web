import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BetaSignupService {
  constructor(
    private _http: HttpClient
  ) {}

  public signup(contactDetails):Observable<any> {
    return this._http.post<any>('/api/sign-up', contactDetails);
  }
}
