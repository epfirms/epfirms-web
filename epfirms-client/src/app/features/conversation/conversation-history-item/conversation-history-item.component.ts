/* eslint-disable @typescript-eslint/dot-notation */
import { Component, Input, OnDestroy } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
import { UserService } from '@app/features/user/services/user.service';
import { MatterService } from '@app/firm-portal/_services/matter-service/matter.service';
import { Conversation, Participant, Message, Paginator, User } from '@twilio/conversations';
import { from, fromEventPattern, map, pluck, Subscription, tap } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-history-item',
  templateUrl: './conversation-history-item.component.html',
  styleUrls: ['./conversation-history-item.component.scss'],
})
export class ConversationHistoryItemComponent implements OnDestroy {
  @Input() selected: boolean = false;

  @Input()
  set conversation(value: Conversation) {
    console.log(value);
    this._conversation = value;
    this.loadOtherParticipants();
    this.loadLastMessage();
    this.listenForUpdates();
  }

  get conversation() {
    return this._conversation;
  }

  unreadMessagesCount: number = 0;

  lastMessage: Message;

  hasUnreadMessages: boolean = false;

  conversationUpdateSubscription: Subscription;

  otherParticipants: Participant[] = [];

  lastMessageAuthorName: string;

  conversationTitle: string;

  private _conversation: Conversation;

  currentUser: User;

  matter: Matter;

  constructor(
    private _conversationService: ConversationService,
    private _matterService: MatterService,
    private _userService: UserService,
  ) {
    this.currentUser = this._conversationService.user;
  }

  ngOnDestroy(): void {
    this.conversationUpdateSubscription.unsubscribe();
  }

  delete() {
    this.conversation.delete().then();
  }

  loadOtherParticipants() {
    from(this.conversation.getParticipants()).subscribe((participants: Participant[]) => {
      const userIdentity = this._conversationService.user.identity;
      this.otherParticipants = participants.filter((p) => p.identity !== userIdentity);
      this.loadConversationTitle();
    });
  }

  loadLastMessage() {
    from(this.conversation.getMessages()).subscribe((paginator: Paginator<Message>) => {
      this.lastMessage = paginator.items.find(
        (message) => message.index === this.conversation.lastMessage.index,
      );

      this.checkUnreadMessages();

      this.getLastMessageAuthorName(this.lastMessage.author);
    });
  }

  getLastMessageAuthorName(author: string) {
    this._userService.get(author).subscribe((user) => {
      this.lastMessageAuthorName = user.full_name;
    });
  }

  checkUnreadMessages() {
    this.hasUnreadMessages = this.conversation.lastMessage.index > this.conversation.lastReadMessageIndex;
  }

  loadConversationTitle() {
    if (this.conversation.attributes['matterId']) {
      this._matterService
        .getById(this.conversation.attributes['matterId'])
        .pipe(
          tap(matter => {
            this.matter = matter;
          }),
          pluck('title'),
          map((title) => {
            if (title && title.length) {
              return title;
            }

            return this.otherParticipants[0].attributes['friendlyName'];
          }),
        )
        .subscribe((title) => {
          this.conversationTitle = title;
        });
    } else {
      this.conversationTitle = this.otherParticipants[0].attributes['friendlyName'];
    }
  }

  listenForUpdates() {
    const addHandler = (handler) => this.conversation.on('updated', handler);
    const removeHandler = (handler) => this.conversation.removeListener('updated', handler);
    this.conversationUpdateSubscription = fromEventPattern(addHandler, removeHandler).subscribe(
      ({ updateReasons }) => {
        const lastMessageUpdated = updateReasons.includes('lastMessage');
        if (lastMessageUpdated) {
          this.loadLastMessage();
        }

        const lastReadMessageUpdated = updateReasons.includes('lastReadMessageIndex');
        if (lastReadMessageUpdated) {
          this.checkUnreadMessages();
        }
      },
    );
  }
}
