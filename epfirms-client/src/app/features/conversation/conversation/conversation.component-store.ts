/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Conversation, Message, Paginator, Participant } from '@twilio/conversations';
import { of, from, switchMap, filter, map, fromEventPattern, Observable } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

export interface ConversationComponentState {
  conversation: Conversation | null;
  messages: Message[];
  otherParticipant: Participant | null;
  paginator: Paginator<Message> | null;
}

@Injectable()
export class ConversationComponentStore extends ComponentStore<ConversationComponentState> {
  constructor(private _conversationService: ConversationService, private _route: ActivatedRoute) {
    super({ conversation: null, messages: [], otherParticipant: null, paginator: null });
  }

  readonly messages$ = this.select((state) => state.messages);

  readonly conversation$ = this.select((state) => state.conversation);

  readonly otherParticipant$ = this.select((state) => state.otherParticipant);
  
  readonly paginator$ = this.select((state) => state.paginator);

  readonly otherParticipantFriendlyName$ = this.select(
    this.otherParticipant$,
    (participant) => participant.attributes['friendlyName'],
  );

  readonly setConversation = this.updater((state, conversation: Conversation) => ({
    ...state,
    conversation,
  }));

  readonly setMessages = this.updater((state, paginator: Paginator<Message>) => ({
    ...state,
    messages: [...state.messages, ...paginator.items],
    paginator: paginator,
  }));

  readonly addMessage = this.updater((state, message: Message) => ({
    ...state,
    messages: [...state.messages, message],
  }));

  readonly addPreviousMessagePage = this.updater((state, paginator: Paginator<Message>) => ({
    ...state,
    messages: [...paginator.items, ...state.messages],
    paginator: paginator,
  }));

  readonly clearMessages = this.updater((state) => ({
    ...state,
    messages: [],
    paginator: null,
  }));

  readonly setOtherParticipant = this.updater((state, otherParticipant: Participant) => ({
    ...state,
    otherParticipant,
  }));

  readonly getConversation = this.effect(() => {
    return this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        from(
          this._conversationService.conversationsClient.getConversationBySid(params.get('id')),
        ).pipe(
          concatLatestFrom(() => this.conversation$),
          tapResponse(
            (conversations) => {
              if (conversations[1] !== null) {
                this._conversationService.setAllMessagesRead(conversations[1]);
              }

              return this.setConversation(conversations[0]);
            },
            () => of(null),
          ),
        ),
      ),
    );
  });

  /** Fetches message paginator for a conversation. */
  readonly getMessages = this.effect(() => {
    return this.conversation$.pipe(
      filter((conversation) => conversation !== null),
      switchMap((conversation) =>
        from(conversation.getMessages()).pipe(
          tapResponse(
            (paginator) => {
              this.clearMessages();
              return this.setMessages(paginator);
            },
            () => of([]),
          ),
        ),
      ),
    );
  });

  readonly getNextMessagePage = this.effect(($: Observable<void>) => {
    return $.pipe(
      concatLatestFrom(() => this.paginator$),
      map(([_, paginator]) => paginator),
      switchMap((paginator) => from(paginator.prevPage()).pipe(
        tapResponse(
          (p) => {
            return this.addPreviousMessagePage(p);
          },
          () => of([]),
        ),
      ))
    );
  });

  /**
   * Loads the other participant in a conversation by checking the currently
   * logged-in user.
   */
  readonly getOtherParticipant = this.effect(() => {
    return this.conversation$.pipe(
      filter((conversation) => conversation !== null),
      switchMap((conversation) =>
        from(conversation.getParticipants()).pipe(
          tapResponse(
            (participants: Participant[]) => {
              const userIdentity = this._conversationService.user.identity;
              const otherParticipant = participants.find((p) => p.identity !== userIdentity);
              return this.setOtherParticipant(otherParticipant);
            },
            () => of(null),
          ),
        ),
      ),
    );
  });

    /**
   * Listener for messages added after loading a conversation.
   */
  readonly listenForAddedMessages = this.effect(() => {
    return this.conversation$.pipe(
      filter((conversation) => conversation !== null),
      map((conversation) => {
        return {
          add: (handler) => conversation.on('messageAdded', handler),
          remove: (handler) => conversation.removeListener('messageAdded', handler),
        };
      }),
      switchMap((eventHandlers) =>
        fromEventPattern(eventHandlers.add, eventHandlers.remove).pipe(
          tapResponse(this.addMessage, () => of([])),
        ),
      ),
    );
  });

  /** Send a new message to a conversation and set it as the last read message index. */
  readonly sendMessage = this.effect((origin$: Observable<string>) => {
    return origin$.pipe(
      concatLatestFrom(() => this.conversation$),
      switchMap(([message, conversation]) =>
        from(conversation.sendMessage(message)).pipe(
          tapResponse(
            (messageIndex) => {
              conversation.updateLastReadMessageIndex(messageIndex).then();
            },
            () => of(null),
          ),
        ),
      ),
    );
  });

  // readonly loadMessages = this.effect(() => {
  //   return this.
  // });

  // readonly selectConversation = this.effect((origin$: Observable<Conversation>) =>
  //   origin$.pipe(
  //     tap(this.updateSelectedConversation),
  //     tap((conversation: Conversation) => {
  //       if (conversation && conversation.sid) {
  //         this._router.navigate([`${conversation.sid}`], {relativeTo: this._route});
  //       }
  //     }),
  //   ),
  // );
}
