import { Injectable } from '@angular/core';
import { MatterTabsService } from '@app/features/matter-tab/services/matter-tabs-service/matter-tabs.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { changePortal, logout } from '../current-user/current-user.actions';

@Injectable()
export class MatterTabsEffects {
  constructor(private actions$: Actions, private _matterTabsService: MatterTabsService) {}

  /** Clear tabs from the store and destroy overlay when user logs out. */
  clearTabs$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout, changePortal),
        tap(() => {
          this._matterTabsService.clear();
        }),
      ),
    { dispatch: false },
  );
}
