import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { from, fromEvent, Subject, takeUntil } from 'rxjs';
import { ConversationsClientService } from '../conversations-client.service';

@Component({
  selector: 'app-chat-conversation-button',
  templateUrl: './chat-conversation-button.component.html',
  styleUrls: ['./chat-conversation-button.component.scss'],
})
export class ChatConversationButtonComponent implements OnDestroy {
  @Input() set conversation(value) {
    this._conversation = value;
    this.setRecipientName();
    this.loadUnreadMessageCount();
    this.updated();
  }

  get conversation() {
    return this._conversation;
  }

  @Input() set opened(value) {
    this._isOpen = value;
    if (!value) {
      this.loadUnreadMessageCount();
    }
  }

  get opened() {
    return this._isOpen;
  }

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isOpen: boolean = false;

  private _conversation;

  recipientName: string;

  unreadMessagesCount: number;

  protected destroy$ = new Subject<void>();

  constructor(private _conversationsClient: ConversationsClientService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  emitOpen() {
    this.opened = true;
    this.openedChange.emit(this.opened);
  }

  setRecipientName() {
    from(this.conversation.getParticipants()).subscribe((participants: any[]) => {
      const userIdentity = this._conversationsClient.user.identity;
      const recipient = participants.find((p) => p.identity !== userIdentity);
      this.recipientName = recipient ? recipient.attributes.friendlyName : '';
    });
  }

  loadUnreadMessageCount() {
    from(this.conversation.getUnreadMessagesCount()).subscribe((count: number) => {
      console.log(count);
      this.unreadMessagesCount = count;
    });
  }

  // Commented out because getUnreadMessageCount is delayed a few seconds. Instead, this has been moved to the 'opened' input binding.
  /** Handles conversation update events. */
  updated() {
    // fromEvent(this.conversation, 'updated')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((data: any) => {
    //     const reasons = data.updateReasons;

    //     console.log(data);
    //     // Updates the unread message counter on new messages.
    //     if (reasons.includes('lastReadMessageIndex') || reasons.includes('lastMessage')) {
    //       this.loadUnreadMessageCount();
    //     }
    //   });
  }
}
