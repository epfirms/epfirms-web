import { Injectable } from '@angular/core';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { logout } from '../current-user/current-user.actions';

@Injectable()
export class CurrentUserEffects {
  constructor(private actions$: Actions, private _currentUserService: CurrentUserService) {}

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this._currentUserService.clear();
        }),
      ),
    { dispatch: false },
  );
}
