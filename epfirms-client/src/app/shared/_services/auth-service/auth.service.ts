import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EntityCacheDispatcher } from '@ngrx/data';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { CurrentUserService } from '../current-user-service/current-user.service';
import { SocketService } from '@app/firm-portal/_services/socket-service/socket.service';

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
    private _matterTabsService: MatterTabsService,
    private _currentUserService: CurrentUserService,
    private _socketService: SocketService
  ) {
    this.accessTokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('accessToken'))
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

          return {success, msg};
        })
      );
  }

  updatePassword(id, token, password: string): Observable<any> {
    return this._http.post<any>('/api/auth/password', {id, token, password});
  }

  getCurrentUserScope(): Observable<any> {
    return this._http.get<any>('/api/auth');
  }

  selectPortal() {
    this._router.navigate(['login', 'select']);
    this._matterTabsService.clear();
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
    this._matterTabsService.clear();
    this._currentUserService.clear();
    this.accessTokenSubject.next(null);
    this._socketService.disconnect();
    this._router.navigate(['login']);
  }
}
