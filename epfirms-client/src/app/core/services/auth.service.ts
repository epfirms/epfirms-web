import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EntityCacheDispatcher } from '@ngrx/data';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { changePortal, logout } from '@app/store/current-user/current-user.actions';

interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenSubject: BehaviorSubject<any>;

  public accessToken: Observable<any>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private entityCacheDispatcher: EntityCacheDispatcher,
    private _socket: Socket,
    private _store: Store,
  ) {
    this.accessTokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('accessToken')),
    );
    this.accessToken = this.accessTokenSubject.asObservable();
  }

  public get accessTokenValue(): any {
    return this.accessTokenSubject.value;
  }

  createFirm(firmDetails, userDetails): Observable<any> {
    return this._http.post<any>('/api/firm', {
      firm: firmDetails,
      user: userDetails,
    });
  }

  login({ email, password }: LoginForm): Observable<any> {
    return this._http
      .post<any>('/api/auth', {
        email,
        password,
      })
      .pipe(
        map(({ success, access_token, msg }) => {
          if (success) {
            localStorage.setItem('accessToken', JSON.stringify(access_token));
            this.accessTokenSubject.next(access_token);
          } else {
            this.logout();
          }

          return { success, msg };
        }),
      );
  }

  verifyPasswordToken(userId: number, token: string): Observable<any> {
    return this._http.get<any>(`/api/auth/password/${userId}`, {
      params: { token: encodeURIComponent(token) },
    });
  }

  updatePassword(id, token, password: string): Observable<any> {
    return this._http.post<any>('/api/auth/password', { id, token, password });
  }

  getCurrentUserScope(): Observable<any> {
    return this._http.get<any>('/api/auth');
  }

  selectPortal() {
    this._router.navigate(['login', 'select']);
    this._store.dispatch(changePortal());
    this.entityCacheDispatcher.clearCollections();
  }

  verifyEmail(token) {
    return this._http.post<any>('/api/auth/VerifyEmail', {
      token: token,
    });
  }

  // Remove access token, clear data stores, disconnect from socket, re-route to login page
  logout() {
    localStorage.removeItem('accessToken');
    this.entityCacheDispatcher.clearCollections();
    this._store.dispatch(logout());
    this.accessTokenSubject.next(null);
    if (this._socket && this._socket.ioSocket && this._socket.ioSocket.connected) {
      this._socket.disconnect();
    }
    this._router.navigate(['login']);
  }
}
