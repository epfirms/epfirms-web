import { Injectable } from '@angular/core';
import { UserService } from '@app/features/user/services/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { switchMap, map, catchError, concatMap, tap, filter } from 'rxjs/operators';
import { ConversationNotification } from '../interfaces/conversation-notification';
import { ConversationService } from '../services/conversation.service';
import { ConversationActions } from '../store/conversation.actions';
import { ConversationNotificationComponent } from '../conversation-notification/conversation-notification.component';
import { Store } from '@ngrx/store';
import { ConversationState } from '@twilio/conversations';

@Injectable()
export class ConversationEventEffects {
  connectionStateChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() =>
        this.conversationService.connectionStateChanged().pipe(
          map((connectionState) =>
            ConversationActions.UpdateConnectionState({ payload: connectionState }),
          ),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  tokenAboutToExpire$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() =>
        this.conversationService.tokenAboutToExpire().pipe(
          map(() => ConversationActions.UpdateAccessToken()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  tokenExpiredEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() =>
        this.conversationService.tokenExpired().pipe(
          map(() => ConversationActions.UpdateAccessToken()),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );

  /**
   * Loads the current user's subscribed conversations from the 'conversationJoined' event.
   */
  loadConversations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() =>
        this.conversationService.conversationJoinedEvent().pipe(
          // Sort conversations by last message date.
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
          // Set the initial unread messages count.
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
      ),
    ),
  );

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

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private _toastService: HotToastService,
    private _userService: UserService,
    private store: Store<{ conversation: ConversationState }>,
  ) {}
}
