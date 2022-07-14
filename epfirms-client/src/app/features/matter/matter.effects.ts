import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, map, catchError, exhaustMap } from 'rxjs';
import { MatterActions } from './matter.actions';
import { MatterService } from './matter.service';

@Injectable()
export class MatterEffects {
  idTokenChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatterActions.loadMatters),
      exhaustMap(() =>
        this.matterService.getAll().pipe(
          map((matters) => MatterActions.loadMattersSuccess({ matters })),
          catchError((error) => of(MatterActions.loadMattersFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private matterService: MatterService) {}
}
