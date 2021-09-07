import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EntityCacheDispatcher } from '@ngrx/data';
import { MatterTabsService } from '@app/firm-portal/_services/matter-tabs-service/matter-tabs.service';
import { CurrentUserService } from '../current-user-service/current-user.service';

interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;

  private accessTokenSubject: BehaviorSubject<any>;

  public currentUser: Observable<any>;

  public accessToken: Observable<any>;

  public userScope: any;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private entityCacheDispatcher: EntityCacheDispatcher,
    private _matterTabsService: MatterTabsService,
    private _currentUserService: CurrentUserService
  ) {
    this.accessTokenSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('accessToken'))
    );
    this.accessToken = this.accessTokenSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
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
        map(({ success, access_token }) => {
          if (success) {
            localStorage.setItem('accessToken', JSON.stringify(access_token));
            this.accessTokenSubject.next(access_token);
          } else {
            this.logout();
          }

          return success;
        })
      );
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

  logout() {
    localStorage.removeItem('accessToken');
    this.entityCacheDispatcher.clearCollections();
    this._matterTabsService.clear();
    this._currentUserService.clear();
    this.accessTokenSubject.next(null);
    this._router.navigate(['login']);
  }
}
