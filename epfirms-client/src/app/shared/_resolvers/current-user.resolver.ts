import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY, forkJoin, Observable } from 'rxjs';
import { CurrentUserService } from '../_services/current-user-service/current-user.service';
import { AuthService } from '../_services/auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserResolver implements Resolve<any> {
  constructor(
    private _currentUserService: CurrentUserService,
    private _authService: AuthService
  ) {}

  resolve(): Observable<any> | Observable<never> {
    return forkJoin({
      user: this._currentUserService.load(),
      scope: this._authService.getCurrentUserScope(),
    }).pipe(
      tap(({ user, scope }) => {
        this._currentUserService.dispatchLoadCurrentUser(user, scope);
      }),
      catchError((err) => {
        console.error('Error fetching current firm ', err);
        return EMPTY;
      })
    );
  }
}
