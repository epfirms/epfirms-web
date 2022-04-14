import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class emailService {

  constructor(
    private _http: HttpClient,
  ) {

  }
  
  sendForgotPasswordEmail(email: string) {
    return this._http.post<any>('/api/emails/forgot-password', {email});
  }

  sendStatementNotifcation(email: string) {
    return this._http.post<any>('/api/emails/statement', {email: email});
  }

  sendIntakeNotifcation(email: string) : Observable<any> {
    return this._http.post<any>('/api/emails/intake', {email: email});
  }
}
