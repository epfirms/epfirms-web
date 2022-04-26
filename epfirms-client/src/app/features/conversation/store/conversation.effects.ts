import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { logout } from '@app/store/current-user/current-user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConversationState } from '@twilio/conversations';
import { EMPTY, from } from 'rxjs';
import {
  map,
  catchError,
  pluck,
  switchMap,
  tap,
  filter,
  concatMap,
  exhaustMap
} from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { ConversationActions } from './conversation.actions';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from '@app/features/user/services/user.service';
import { ConversationNotification } from '../interfaces/conversation-notification';
import { ConversationNotificationComponent } from '../conversation-notification/conversation-notification.component';

@Injectable()
export class ConversationEffects {
  /** Initialize twilio client. */
  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.Init),
      switchMap(() =>
        this.conversationService.getAccessToken().pipe(
          pluck('data'),
          // Initialize the conversations client using the generated access token.
          switchMap((token) => this.conversationService.init(token).pipe(tap(() => {this.store.dispatch(ConversationActions.SetAccessToken({ payload: token }))}))),
          // Update client initialization state in store.
          map(() => ConversationActions.InitSuccess()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() => this.conversationService.conversationJoinedEvent()),
      tap((conversation) => {
        const sortedConversations = [
          ...this.conversationService.conversations$.value,
          conversation,
        ].sort((a, b) => {
          const aLastMessage = a.lastMessage;
          const bLastMessage = b.lastMessage;
          if (aLastMessage && bLastMessage) {
            return bLastMessage.dateCreated.getTime() - aLastMessage.dateCreated.getTime();
          }

          if (aLastMessage) {
            return 1;
          }
          return -1;
        });
        this.conversationService.conversations$.next(sortedConversations);
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
      map((count) => ConversationActions.IncreaseUnreadMessageCount({ payload: count })),
      catchError(() => EMPTY),
    ),
  );

  // addEventHandlers$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ConversationActions.UpdateConnectionState),
  //       tap((state) => {
  //         if (state.connectionState === 'connecting') { }
  //         if (state.connectionState === 'connected') {
  //           this.conversationService.syncUserProfile();
  //           this.store.dispatch(ConversationActions.LoadConversations());
  //           this.store.dispatch(ConversationActions.AddEventListeners());
  //         }
  //         if (state.connectionState === 'disconnecting') { }
  //         if (state.connectionState === 'disconnected') {
  //           this.store.dispatch(ConversationActions.RemoveEventListeners());
  //         }
  //         if (state.connectionState === 'denied') {
  //           this._authService.logout();
  //         }
  //       }),
  //       catchError(() => EMPTY),
  //     ),
  //   { dispatch: false },
  // );

  messageAdded$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ConversationActions.InitSuccess),
        switchMap(() =>
          this.conversationService.messageAdded().pipe(
            tap((message) => {
              const filteredConversations = this.conversationService.conversations$.value.filter(
                (c) => c.sid !== message.conversation.sid,
              );
              this.conversationService.conversations$.next([
                message.conversation,
                ...filteredConversations,
              ]);
            }),
            filter((message) => message.author !== this.conversationService.user.identity),
            tap((message) => {
              this._userService.get(message.author).subscribe((user) => {
                const toastRef = this._toastService.show<ConversationNotification>(
                  ConversationNotificationComponent,
                  {
                    duration: 8000,
                    dismissible: false,
                    data: {
                      message,
                      user,
                    },
                    style: {
                      color: 'rgb(15, 23, 42)',
                      'font-weight': '500',
                      'font-size': '0.875rem',
                      'background-color': 'rgb(255, 255, 255)',
                      'border-radius': '0.375rem',
                      overflow: 'hidden',
                      width: '28rem',
                      'max-width': '28rem',
                      margin: '1.5rem',
                      padding: '0',
                      'box-shadow':
                        '0 0 0 0px #fff, 0 0 0 1px rgba(0, 0, 0, .05), 0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    },
                  },
                );

                toastRef.afterClosed.subscribe((data) => {
                  if (!data.dismissedByAction) {
                    this.store.dispatch(
                      ConversationActions.IncreaseUnreadMessageCount({ payload: 1 }),
                    );
                  }
                });
              });
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
        ofType(ConversationActions.UpdateAccessToken),
        exhaustMap(() =>
          this.conversationService.getAccessToken().pipe(
            pluck('data'),
            switchMap((token) => this.conversationService.updateAccessToken(token).pipe(
              map(() => ConversationActions.SetAccessToken({ payload: token })),
              catchError(() => EMPTY),
            )),
          ),
        ),
      ),
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
    private _toastService: HotToastService,
    private _userService: UserService,
  ) {}
}
