import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ConversationService } from '../services/conversation.service';
import { ConversationActions } from '../store/conversation.actions';

@Injectable()
export class ConversationEventEffects {
  connectionStateChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConversationActions.InitSuccess),
      switchMap(() =>
        this.conversationService.connectionStateChanged().pipe(
          map((connectionState) => ConversationActions.UpdateConnectionState({ payload: connectionState })),
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

  constructor(private actions$: Actions, private conversationService: ConversationService) {}
}
