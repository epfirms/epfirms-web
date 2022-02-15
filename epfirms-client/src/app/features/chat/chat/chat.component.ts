import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { Observable, pluck, Subject, takeUntil, tap } from 'rxjs';
import { chatWindowAnimation } from '../chat-animations';
import { ChatService, ConnectionState } from '../chat.service';

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

  conversation$: Observable<any[]>;

  currentUser$: Observable<any>;

  connectionState: ConnectionState;

  protected destroy$ = new Subject<void>();

  constructor(private _chatService: ChatService, private _currentUser: CurrentUserService) {
    this.conversation$ = this._chatService.conversation$;
    this.currentUser$ = this._currentUser.user$;
  }

  ngOnInit(): void {
    this._chatService.conversation$.pipe(takeUntil(this.destroy$)).subscribe((conversations) => {
      this.conversationItems = conversations;
    });

    this._chatService
      .initConversations()
      .pipe(
        tap((state: ConnectionState) => {
          if (state === 'connected') {
            this.currentUser$.pipe(takeUntil(this.destroy$), pluck('user')).subscribe((user) => {
              this._chatService.updateFriendlyName(user.full_name);
              this._chatService.updateUserAttributes(user.profile_image);
            });
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((state) => {
        this.connectionState = state;
        if (state === 'connected') {
          this._chatService.conversationAddedEvent().subscribe((conversation) => {
            this.conversationItems.push(conversation);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openChat(conversation): void {
    this.openedConversationItems.add(conversation);
  }

  minimizeChat(conversation): void {
    this.openedConversationItems.delete(conversation);
  }

  toggleNewChatWindow(): void {
    this.newChat = !this.newChat;
  }

  createConversation(value): void {
    const userIdentity = this._chatService.conversationsClient.user.identity;
    const recipientIdentity = value.userId;

    const existingConversation = this.findDirectConversation(userIdentity, recipientIdentity);
    if (!existingConversation) {
      this._chatService
        .createConversation()
        .pipe(takeUntil(this.destroy$))
        .subscribe((conversation) => {
          this._chatService
            .addParticipant(conversation, value.userId.toString())
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this._chatService
                .sendMessage(conversation, value.body)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                  this.toggleNewChatWindow();
                  this.openChat(conversation);
                });
            });
        });
    } else {
      this._chatService
        .sendMessage(existingConversation, value.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.toggleNewChatWindow();
        });
    }
  }

  findDirectConversation(currentIdentity: string, recipientIdentity: string) {
    return this.conversationItems.find((conversation) => {
      console.log(conversation);
      const attributes = conversation.attributes;
      const participants = [...conversation.participants.values()];
      console.log(participants);
      console.log(conversation.participants.values());
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
}
