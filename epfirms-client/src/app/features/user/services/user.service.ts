import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Returns a full user record for the given user ID.
   */
  get(id: number | string): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }

  checkPhoneNumber(number: string): Observable<any> {
    return this.http.get(`/api/phone-numbers/${number}`);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get(`/api/user/email-address/${email}`);
  }
}
