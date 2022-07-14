import { Injectable } from '@angular/core';
import { AuthActions } from '@app/features/auth/auth.actions';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ConversationState } from '@twilio/conversations';
import { EMPTY } from 'rxjs';
import { map, catchError, pluck, switchMap, tap, filter, exhaustMap } from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { ConversationActions } from './conversation.actions';

@Injectable()
export class ConversationEffects implements OnInitEffects {
  /**
   * Initializes the twilio client.
   * */
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.Init),
      switchMap(() =>
        this.conversationService.getAccessToken().pipe(
          pluck('data'),
          // Initialize the conversations client using the generated access token.
          switchMap((token) =>
            this.conversationService.init(token).pipe(
              tap(() => {
                this.store.dispatch(ConversationActions.SetAccessToken({ payload: token }));
              }),
            ),
          ),
          map(() => ConversationActions.InitSuccess()),
          catchError((err) => {
            if (err === 'Subaccount is not active') {
              this.store.dispatch(ConversationActions.UpdateSubaccountStatus({payload: 'suspended'}));
            }

            return EMPTY;
          }),
        ),
      ),
    ),
  );

  /**
   * Updates the friendlyName and attributes of the current conversations user
   * with their user profile.
   */
  syncUserProfile$ = this.actions$.pipe(
    ofType(ConversationActions.UpdateConnectionState),
    filter((action) => action.payload === 'connected'),
    switchMap(() =>
      this.conversationService.syncUserProfile().pipe(
        map(() => ConversationActions.SyncUserProfile()),
        catchError(() => EMPTY),
      ),
    ),
  );

  /**
   * Updates the access token when the token about to expire event is triggered.
   */
  updateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.UpdateAccessToken),
      exhaustMap(() =>
        this.conversationService.getAccessToken().pipe(
          pluck('data'),
          switchMap((token) =>
            this.conversationService.updateAccessToken(token).pipe(
              map(() => ConversationActions.SetAccessToken({ payload: token })),
              catchError(() => EMPTY),
            ),
          ),
        ),
      ),
    ),
  );

  /** Shut down the conversations client on logout. */
  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOut),
        tap(() => {
          this.conversationService.shutdown();
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store<{ conversation: ConversationState }>,
  ) {}

  ngrxOnInitEffects(): Action {
    return ConversationActions.Init();
  }
}
