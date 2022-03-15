import { Component, Input, OnDestroy } from '@angular/core';
import { Conversation, Participant, Message, Paginator } from '@twilio/conversations';
import { from } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-history-item',
  templateUrl: './conversation-history-item.component.html',
  styleUrls: ['./conversation-history-item.component.scss']
})
export class ConversationHistoryItemComponent implements OnDestroy {
  @Input() selected: boolean = false;

  @Input()
  set conversation(value: Conversation) {
    this._conversation = value;
    this.loadOtherParticipant();
    this.loadLastMessage();
    this.listenForUpdates();
  }

  get conversation() {
    return this._conversation;
  }

  unreadMessagesCount: number = 0;

  otherParticipant: Participant;

  lastMessage: Message;

  private _conversation: Conversation;

  get friendlyName() {
    if (this.otherParticipant) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      return this.otherParticipant.attributes['friendlyName'];
    }
  }

  get profileImage() {
    if (this.otherParticipant) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      return this.otherParticipant.attributes['profileImage'];
    }
  }

  constructor(private _conversationService: ConversationService) {}

  ngOnDestroy(): void {
    this.conversation.removeAllListeners();
  }

  loadOtherParticipant() {
    from(this.conversation.getParticipants()).subscribe((participants: any[]) => {
      if (participants && participants.length === 2) {
        const userIdentity = this._conversationService.user.identity;
        this.otherParticipant = participants.find((p) => p.identity !== userIdentity);
      }
    });
  }

  loadLastMessage() {
    from(this.conversation.getMessages()).subscribe((paginator: Paginator<Message>) => {
      this.lastMessage = paginator.items.find(
        (message) => message.index === this.conversation.lastMessage.index,
      );
    });
  }

  listenForUpdates() {
    this.conversation.on('updated', ({ conversation, updateReasons }) => {
      const lastMessageUpdated = updateReasons.includes('lastMessage');
      if (lastMessageUpdated) {
        this.loadLastMessage();
      }
    });
  }
}
