import { Injectable } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { catchError, map, exhaustMap, mergeMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as SocketActions from './socket.actions';
import { AuthService } from '../auth/auth.service';
import { SocketService } from './socket.service';
import { AuthActions } from '../auth/auth.actions';


@Injectable()
export class SocketEffects implements OnRunEffects {
  connect$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(SocketActions.connectSocket),
      exhaustMap(() =>
        this.authService.idTokenResult$.pipe(
          mergeMap(decodedToken => this.socketService.connect(decodedToken.claims.firm_access.firm_id, decodedToken.token).pipe(
            map(data => SocketActions.connectSocketSuccess({ namespace: 'x' })),
            catchError(error => of(SocketActions.connectSocketFailure({ error: error.message }))))
          ))
      )
    );
  });


  constructor(private actions$: Actions, private authService: AuthService, private socketService: SocketService ) {}

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>) {
    return this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      exhaustMap(() =>
        resolvedEffects$.pipe(
          takeUntil(this.actions$.pipe(ofType(AuthActions.signOut)))
        )
      )
    );
  }
}
