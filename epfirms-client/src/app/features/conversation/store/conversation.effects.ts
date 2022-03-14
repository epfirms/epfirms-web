import { Injectable } from '@angular/core';
import { logout } from '@app/store/current-user/current-user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, pluck, switchMap, tap } from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { connect, updateAccessToken, updateConnectionState } from './conversation.actions';

@Injectable()
export class ConversationEffects {
  /** Initializes twilio client. */
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(connect),
      mergeMap(() =>
        this.conversationService.getAccessToken().pipe(
          pluck('data'),
          // Initialize the conversations client using the generated access token.
          switchMap((token) => this.conversationService.init(token)),
          // Update connection state in store.
          map((connectionState) => updateConnectionState({ connectionState })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  /** Handle changes in connection state. */
  updateConnectionState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateConnectionState),
      tap((state) => {
        switch (state.connectionState) {
          case 'connected':
            this.conversationService.syncUserProfile();

            // Event listeners
            this.conversationService.conversationJoined();
            this.conversationService.tokenAboutToExpire();
            this.conversationService.tokenExpired();
            break;
        }
      }),
      catchError(() => EMPTY)
    ),
    {dispatch: false}
  );

  updateToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateAccessToken),
        map(() =>
          this.conversationService.getAccessToken().pipe(
            pluck('data'),
            switchMap((token) => this.conversationService.updateAccessToken(token)),
          ),
        ),
      ),
    { dispatch: false },
  );

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.conversationService.shutdown();
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private conversationService: ConversationService) {}
}
