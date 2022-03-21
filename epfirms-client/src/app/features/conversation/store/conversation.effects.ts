import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { logout } from '@app/store/current-user/current-user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConversationState } from '@twilio/conversations';
import { EMPTY, from } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  pluck,
  switchMap,
  tap,
  filter,
  concatMap,
} from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { updateAccessToken } from './conversation.actions';
import * as ConversationActions from '../store/conversation.actions';

@Injectable()
export class ConversationEffects {
  /** Initialize twilio client. */
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.init),
      mergeMap(() =>
        this.conversationService.getAccessToken().pipe(
          pluck('data'),
          // Initialize the conversations client using the generated access token.
          switchMap((token) => this.conversationService.init(token)),
          tap((connectionState) => {
            if (connectionState === 'connected') {
              this.store.dispatch(ConversationActions.loadConversations());
            }
          }),
          // Update client initialization state in store.
          map((connectionState) => ConversationActions.updateConnectionState({ connectionState })),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.loadConversations),
      switchMap(() => this.conversationService.conversationJoinedEvent()),
      tap((conversation) => {
        this.conversationService.conversations$.next([
          ...this.conversationService.conversations$.value,
          conversation,
        ]);
      }),
      concatMap((conversation) =>
        from(conversation.getUnreadMessagesCount()).pipe(
          tap((count) => {
            if (count === null) {
              conversation.setAllMessagesUnread().then();
            }
          }),
        ),
      ),
      map((count) => ConversationActions.increaseUnreadMessageCount({ payload: count })),
      catchError(() => EMPTY),
    ),
  );

  addEventHandlers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConversationActions.updateConnectionState),
        tap((state) => {
          switch (state.connectionState) {
            case 'connected':
              this.conversationService.syncUserProfile();
              this.conversationService.tokenAboutToExpire();
              this.conversationService.tokenExpired();
              break;
            case 'disconnecting':
            case 'disconnected':
              this.store.dispatch(ConversationActions.updateAccessToken());
              break;
            case 'error':
            case 'denied':
              this._authService.logout();
              break;
          }
        }),
        catchError(() => EMPTY),
      ),
    { dispatch: false },
  );

  messageAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConversationActions.updateConnectionState),
        filter((action) => action.connectionState === 'connected'),
        mergeMap(() =>
          this.conversationService.messageAdded().pipe(
            filter((message) => message.author !== this.conversationService.user.identity),
            tap(() => {
              this.store.dispatch(ConversationActions.increaseUnreadMessageCount({ payload: 1 }));
            }),
            catchError(() => EMPTY),
          ),
        ),
      ),
    { dispatch: false },
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

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private store: Store<{ conversation: ConversationState }>,
    private _authService: AuthService,
  ) {}
}
