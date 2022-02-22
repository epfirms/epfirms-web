import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import {
  concatMap,
  map,
  merge,
  Observable,
  pluck,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { chatWindowAnimation } from '../chat-animations';
import { ConversationsClientService } from '../conversations-client.service';
import { ConnectionState } from '../types/conversations-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [chatWindowAnimation],
})
export class ChatComponent implements OnInit, OnDestroy {
  newChat: boolean = false;

  openedConversationItems: Set<any> = new Set<any>();

  conversationItems: any[] = [];

  extraConversationItems: any[] = [];

  currentUser$: Observable<any>;

  connectionState: ConnectionState;

  protected destroy$ = new Subject<void>();

  constructor(
    private _conversationsClient: ConversationsClientService,
    private _currentUser: CurrentUserService,
  ) {
    this.currentUser$ = this._currentUser.user$;
  }

  ngOnInit(): void {
    this.initClient();
  }

  handleConnectionStateChange(state: ConnectionState): void {
    switch (state) {
      case 'connected':
        // Update the current twilio client user's friendly name and profile image to match profile info on epfirms.
        this.currentUser$.pipe(take(1), pluck('user')).subscribe((user) => {
          this._conversationsClient.updateUserFriendlyName(user.full_name).subscribe();
          this._conversationsClient.updateUserAttributes(user.profile_image).subscribe();
        });

        this._subscribeToConversationJoined();
        // this._subscribeToPushNotification();
        this._subscribeToTokenExpiration();
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openChat(conversation): void {
    const maxWindows = this.newChat ? 2 : 3;
    if (this.openedConversationItems.size >= maxWindows) {
      this.minimizeNextChat();
    }
    this.openedConversationItems.add(conversation);
  }

  minimizeChat(conversation): void {
    this.openedConversationItems.delete(conversation);
  }

  toggleNewChatWindow(): void {
    const maxWindows = this.newChat ? 2 : 3;
    if (this.openedConversationItems.size >= maxWindows) {
      this.minimizeNextChat();
    }
    this.newChat = !this.newChat;
  }

  minimizeNextChat() {
    const iterator = this.openedConversationItems[Symbol.iterator]();
    this.minimizeChat(iterator.next().value);
  }

  createConversation(value): void {
    const userIdentity = this._conversationsClient.user.identity;
    const recipientIdentity = value.userId;

    const existingConversation = this.findDirectConversation(userIdentity, recipientIdentity);
    if (!existingConversation) {
      this._conversationsClient
        .createConversation()
        .pipe(takeUntil(this.destroy$))
        .subscribe((conversation) => {
          this._conversationsClient
            .addParticipant(conversation, value.userId.toString())
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this._conversationsClient
                .sendMessage(conversation, value.body)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.toggleNewChatWindow();
                  this.openChat(conversation);
                });
            });
        });
    } else {
      this._conversationsClient
        .sendMessage(existingConversation, value.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toggleNewChatWindow();
          this.openChat(existingConversation);
        });
    }
  }

  findDirectConversation(currentIdentity: string, recipientIdentity: string) {
    return this.conversationItems.find((conversation) => {
      const attributes = conversation.attributes;
      const participants = [...conversation.participants.values()];
      return (
        attributes.type === 'direct' &&
        participants.some((p) => p.identity === currentIdentity) &&
        participants.some((p) => p.identity === recipientIdentity)
      );
    });
  }

  delete(conversation) {
    conversation.delete().then((c) => {
      console.log(c);
    });
  }

  conversationIsOpen(conversation) {
    return this.openedConversationItems.has(conversation);
  }

  getRecipientName(conversation) {
    const userIdentity = this._conversationsClient.user.identity;
    const participants = [...conversation.participants.values()];
    const recipient = participants.find((p) => p.identity !== userIdentity);
    return recipient ? recipient.attributes.friendlyName : 'N/A';
  }

  initClient() {
    this._conversationsClient
    .getAccessToken()
    .pipe(
      pluck('data'),
      // Initialize the conversations client using the generated access token.
      switchMap((token) => this._conversationsClient.init(token)),
      takeUntil(this.destroy$),
    )
    .subscribe((state: any) => {
      this.connectionState = state;
      this.handleConnectionStateChange(state);
    });
  }

  private _subscribeToConversationJoined() {
    this._conversationsClient.conversationJoined().subscribe((conversation) => {
      this.conversationItems.push(conversation);
    });
  }

  private _subscribeToPushNotification() {
    this._conversationsClient.pushNotification().subscribe((test) => {
      console.log(test);
    });
  }

  /** Updates access token 3 minutes before expiration or after expiration. */
  private _subscribeToTokenExpiration() {
    merge(this._conversationsClient.tokenExpired(), this._conversationsClient.tokenAboutToExpire())
      .pipe(
        map(() =>
          this._conversationsClient.getAccessToken().pipe(
            pluck('data'),
            concatMap((token) => this._conversationsClient.updateAccessToken(token)),
          ),
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
}
