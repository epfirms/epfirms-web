import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Conversation, Message, User, Participant, Paginator } from '@twilio/conversations';
import { Subject, from, tap, takeUntil, switchMap, fromEventPattern, Subscription } from 'rxjs';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnDestroy {
  set conversation(value: Conversation) {
    this._conversation = value;
  }

  get conversation() {
    return this._conversation;
  }

  messages: Message[];

  currentUser: User;

  otherParticipant: Participant;

  newMessage: string;

  messagePaginator: Paginator<Message>;

  messageAddedSubscription: Subscription;

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

  constructor(private _conversationService: ConversationService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentUser = this._conversationService.user;

    // Fetch conversation by route param.
    this._route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          from(
            this._conversationService.conversationsClient.getConversationBySid(params.get('id')),
          ),
        ),
      )
      .subscribe((conversation: Conversation) => {
        // We need to trigger cleanup actions manually because
        // angular reuses the component instance on dynamic route changes
        // which prevents ngOnDestroy from being run.
        if (this._conversation) {
          this.destroy();
        }

        // Sets all messages as 'read', fetches the conversation's messages,
        // and sets the other participant when a conversation is selected.
        this._conversation = conversation;
        this.loadMessages();
        this.loadOtherParticipant();
      });
  }

  /**
   * Run cleanup operations when navigating away from messages page.
   *  */
  ngOnDestroy(): void {
    this.destroy();
  }

  /** Unsubscribes from 'messageAdded' event. */
  destroy() {
    this._conversationService.setAllMessagesRead(this._conversation);
    this.messageAddedSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Fetches message paginator for a conversation. */
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
        this.messagePaginator = paginator;
      });
  }

  /** Fetch additional pages from message paginator. */
  loadMoreMessages(): void {
    if (this.messagePaginator.hasNextPage) {
      this.messagePaginator.nextPage().then((paginator) => {
        this.messages.unshift(...paginator.items);
        this.messagePaginator = paginator;
      });
    }
  }

  /**
   * Loads the other participant in a conversation by checking the currently
   * logged-in user.
   *  */
  loadOtherParticipant() {
    from(this.conversation.getParticipants()).subscribe((participants: any[]) => {
      const userIdentity = this.currentUser.identity;
      this.otherParticipant = participants.find((p) => p.identity !== userIdentity);
    });
  }

  /**
   * Listener for messages added after loading a conversation.
   */
  subscribeToAddedMessage() {
    const addHandler = (handler) => this.conversation.on('messageAdded', handler);
    const removeHandler = (handler) => this.conversation.removeListener('messageAdded', handler);
    this.messageAddedSubscription = fromEventPattern(addHandler, removeHandler).subscribe(
      (message: Message) => {
        this.messages.push(message);
      },
    );
  }

  /** Send a new message to a conversation and set it as the last read message index. */
  sendMessage() {
    from(this.conversation.sendMessage(this.newMessage))
      .pipe(takeUntil(this.destroy$))
      .subscribe((messageIndex) => {
        this.conversation.updateLastReadMessageIndex(messageIndex).then();
        this.newMessage = null;
      });
  }
}
