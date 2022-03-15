import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Conversation, Message, User, Participant, Paginator } from '@twilio/conversations';
import { Subject, from, tap, takeUntil, switchMap } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  providers: []
})
export class ConversationComponent implements OnInit, OnDestroy {
  @Input()
  set conversation(value: Conversation) {
    if (this._conversation) {
      this._conversation.setAllMessagesRead().then();
    }

    this._conversation = value;
    this.loadMessages();
    this.loadOtherParticipant();
  }

  get conversation() {
    return this._conversation;
  }

  messages: Message[];

  currentUser: User;

  otherParticipant: Participant;

  newMessage: string;

  paginator: Paginator<Message>;

  private _conversation: Conversation;

  protected destroy$ = new Subject<void>();

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

  constructor(private _conversationService: ConversationService,     private _route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.currentUser = this._conversationService.user;

    this._route.paramMap.pipe(
      switchMap((params: ParamMap) => from(this._conversationService.conversationsClient.getConversationBySid(params.get('id'))))
    ).subscribe((conversation: Conversation) => {
        if (this._conversation) {
          this.destroy();
        }
        this._conversation = conversation;
        this.loadMessages();
        this.loadOtherParticipant();
    });
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy() {
    this._conversation.setAllMessagesRead().then();
    this._conversation.removeAllListeners();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Full message content is not included in conversations from the client SDK so it has to be manually loaded. */
  loadMessages(): void {
    from(this.conversation.getMessages())
      .pipe(
        // Subscribe to messages added after initial call.
        tap(() => {
          this.subscribeToAddedMessage();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((paginator: Paginator<Message>) => {
        this.messages = paginator.items;
        console.log('from loadMessages', this.conversation.lastReadMessageIndex);
        // if (this.messages.length && this.conversation.lastReadMessageIndex === null) {
        //   this.conversation.updateLastReadMessageIndex(this.messages[0].index).then();
        // }
      });
  }

  loadOtherParticipant() {
    from(this.conversation.getParticipants()).subscribe((participants: any[]) => {
      const userIdentity = this.currentUser.identity;
      this.otherParticipant = participants.find((p) => p.identity !== userIdentity);
    });
  }

  subscribeToAddedMessage() {
    this.conversation.on('messageAdded', (message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    from(this.conversation.sendMessage(this.newMessage))
      .pipe(takeUntil(this.destroy$))
      .subscribe((messageIndex) => {
        this.conversation.updateLastReadMessageIndex(messageIndex).then();
        this.newMessage = null;
      });
  }
}
