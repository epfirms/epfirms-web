import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { concatMap, from, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnDestroy, OnInit {
  /** Sets conversation value and loads messages. */
  @Input()
  set conversation(value) {
    this._conversation = value;
    this.loadMessages();
    this.loadRecipient();
  }

  /** Get conversation value. */
  get conversation() {
    return this._conversation;
  }

  /** Emits the conversation sid when the minimize button is clicked. */
  @Output() minimized: EventEmitter<any> = new EventEmitter<any>();

  /** Emits the conversation sid when the close button is clicked. */
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  /** Messages in conversation. */
  messages;

  currentUser;

  newMessage: string;

  recipient;

  /** Twilio conversation object. */
  private _conversation;
  
  protected destroy$ = new Subject<void>();

  constructor(private _chatService: ChatService) {
    this.currentUser = this._chatService.conversationsClient.user;
  }

  ngOnInit(): void {
      this.setAllMessagesRead();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /** Full message content is not included in conversations from the client SDK so it has to be manually loaded. */
  loadMessages(): void {
    from(this.conversation.getMessages()).pipe(
      // Subscribe to messages added after initial call.
      tap(() => {this.subscribeToAddedMessage()}),
      takeUntil(this.destroy$)
    ).subscribe((paginator: any) => {
      this.messages = [...paginator.items];
    });
  }

  closeWindow() {
    this.closed.emit(this.conversation);
  }

  minimizeWindow() {
    this.minimized.emit(this.conversation);
  }

  sendMessage() {
    from(this.conversation.sendMessage(this.newMessage)).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.newMessage = null;
    });
  }

  loadRecipient() {
    from(this.conversation.getParticipants()).pipe(concatMap((participants: any[]) => {
      this.recipient = participants.find(p => p.identity !== this.currentUser.identity);
      return from(this.recipient.getUser());
    }),
    takeUntil(this.destroy$)).subscribe((recipient) => {
      this.recipient = recipient;
    });
  }

  subscribeToAddedMessage() {
    fromEvent(this.conversation, 'messageAdded').pipe(takeUntil(this.destroy$)).subscribe((message) => {
      this.messages.push(message);
      this.setAllMessagesRead();
    });
  }

  delete(){
    this.conversation.delete();
  }

  setAllMessagesRead() {
    from(this.conversation.setAllMessagesRead()).subscribe();
  }
}
