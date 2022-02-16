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
      this.conversationItems = [...conversations];
      this.conversationItems.forEach((c) => console.log(new Date(c.dateUpdated)))
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
        takeUntil(this.destroy$)
      )
      .subscribe((state) => {
        this.connectionState = state;
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

  //TODO: Catch error and delete created conversation.
  startNewConversation(): void {
    this._chatService
      .createConversation()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  toggleNewChatWindow(): void {
    this.newChat = !this.newChat;
  }

  createConversation(value): void {
    this._chatService.createConversation().pipe(takeUntil(this.destroy$)).subscribe(conversation => {
      const existingConversation = this.findDirectConversation(conversation.createdBy, value.userId)
      if (!existingConversation) {
      this._chatService.addParticipant(conversation, value.userId.toString()).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this._chatService.sendMessage(conversation, value.body).pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.toggleNewChatWindow();
          this.openChat(conversation);
        });
      });
    } else {
      this._chatService.sendMessage(existingConversation, value.body).pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.toggleNewChatWindow();
        this.openChat(existingConversation);
      });
    }
    });
  }

  findDirectConversation(current, recipient) {
    return [...this.conversationItems, ...this.openedConversationItems].find(conversation => {
      const attributes = conversation.attributes;
      return attributes.type === 'direct' && attributes.participants.includes(current) && attributes.participants.includes(recipient);
    })
  }

  delete(conversation) {
    conversation.delete().then(c => {
      console.log(c)
    });
  }
}
