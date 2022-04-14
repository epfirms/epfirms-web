/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Matter } from '@app/core/interfaces/matter';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Conversation, Message, Paginator, Participant, User } from '@twilio/conversations';
import { of, from, switchMap, filter, map, fromEventPattern, Observable, pluck } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

export interface ConversationComponentState {
  currentUser: User;
  conversationTitle: string;
  conversation: Conversation | null;
  messages: Message[];
  paginator: Paginator<Message> | null;
  otherParticipants: Participant[];
  matter: Matter | null;
}

@Injectable()
export class ConversationComponentStore extends ComponentStore<ConversationComponentState> {
  constructor(private _conversationService: ConversationService, private _route: ActivatedRoute, private _matterService: MatterService) {
    super({ currentUser: _conversationService.conversationsClient.user, conversationTitle: '', conversation: null, messages: [], paginator: null, otherParticipants: [], matter: null });
  }

  readonly currentUser$ = this.select((state) => state.currentUser);

  readonly messages$ = this.select((state) => state.messages);

  readonly conversation$ = this.select((state) => state.conversation);

  readonly otherParticipants$ = this.select((state) => state.otherParticipants);

  readonly paginator$ = this.select((state) => state.paginator);

  readonly matter$ = this.select((state) => state.matter);

  readonly conversationTitle$ = this.select((state) => state.conversationTitle);

  readonly setConversation = this.updater((state, conversation: Conversation) => ({
    ...state,
    conversation,
  }));

  readonly setConversationTitle = this.updater((state, conversationTitle: string) => ({
    ...state,
    conversationTitle,
  }));

  readonly setMatter = this.updater((state, matter: Matter) => ({
    ...state,
    matter,
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

  readonly setOtherParticipants = this.updater((state, otherParticipants: Participant[]) => ({
    ...state,
    otherParticipants,
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

  readonly getOtherParticipants = this.effect(() => {
    return this.conversation$.pipe(
      filter((conversation) => conversation !== null),
      switchMap((conversation) =>
        from(conversation.getParticipants()).pipe(
          tapResponse(
            (participants: Participant[]) => {
              const userIdentity = this._conversationService.user.identity;
              const otherParticipants = participants.filter((p) => p.identity !== userIdentity);
              return this.setOtherParticipants(otherParticipants);
            },
            () => of([]),
          ),
        ),
      ),
    );
  });

  readonly getConversationTitle = this.effect(() => {
    return this.otherParticipants$.pipe(
      concatLatestFrom(() => this.conversation$.pipe(filter((conversation) => conversation !== null))),
      switchMap(([otherParticipants, conversation]) => {
        if (conversation.attributes['matterId']) {
          return this._matterService.getById(conversation.attributes['matterId']).pipe(
            pluck('title'),
            map((title) => {
              if (title && title.length) {
                return title;
              }

              return of(otherParticipants).pipe(map(participants => participants[0].attributes['friendlyName']),
              tapResponse(this.setConversationTitle, () => of(''))
            )
            }),
            tapResponse(this.setConversationTitle, () => of('')),
          )
      }

      return of(otherParticipants).pipe(map(participants => participants[0].attributes['friendlyName']),
        tapResponse(this.setConversationTitle, () => of(''))
      )
    }),
  );
  });

  readonly getMatter = this.effect(() => {
    return this.conversation$.pipe(
      filter((conversation) => conversation !== null),
      switchMap((conversation) => {
          return this._matterService.getById(conversation.attributes['matterId']).pipe(
            tapResponse(
              this.setMatter,
              () => of(null),
            ),
          )
    }))
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
