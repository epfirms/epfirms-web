import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversationService } from '@app/features/conversation/services/conversation.service';
import { ComponentStore } from '@ngrx/component-store';
import { Conversation } from '@twilio/conversations';
import { catchError, Observable, of, pluck, tap } from 'rxjs';

export interface MessagesPageState {
  selectedConversation: Conversation | null;
  conversationItems: Array<Conversation>;
}

@Injectable()
export class MessagesPageStore extends ComponentStore<MessagesPageState> {
  constructor(
    private _conversationService: ConversationService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    super({ selectedConversation: null, conversationItems: [] });
  }

  readonly conversationItems$ = this.select((state) => state.conversationItems);

  readonly selectedConversation$ = this.select((state) => state.selectedConversation);

  readonly setConversationItems = this.updater((state, conversationItems: Array<Conversation>) => ({
    ...state,
    conversationItems,
  }));

  readonly setSelectedConversation = this.updater(
    (state: MessagesPageState, conversation: Conversation) => ({
      ...state,
      selectedConversation: conversation,
    }),
  );

  readonly loadConversationItems = this.effect(() => {
    return this._conversationService.conversations$.pipe(
      catchError((err: Error) => {
        console.error(err);
        return of([]);
      }),
      tap(this.setConversationItems),
    );
  });

  readonly updateSelectedConversation = this.updater(
    (state: MessagesPageState, conversation: Conversation) => ({
      ...state,
      selectedConversation: conversation,
    }),
  );

  readonly selectConversation = this.effect((origin$: Observable<Conversation>) =>
    origin$.pipe(
      tap(this.updateSelectedConversation),
      tap((conversation: Conversation) => {
        if (conversation && conversation.sid) {
          this._router.navigate([`${conversation.sid}`], {relativeTo: this._route});
        }
      }),
    ),
  );
}
