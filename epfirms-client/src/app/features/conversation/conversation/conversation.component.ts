import { Component, OnInit } from '@angular/core';
import { Conversation, Message, Participant } from '@twilio/conversations';
import { Observable, take } from 'rxjs';
import { ConversationComponentStore } from './conversation.component-store';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  providers: [ConversationComponentStore],
})
export class ConversationComponent implements OnInit {
  conversation$: Observable<Conversation> = this.conversationComponentStore.conversation$;

  otherParticipants$: Observable<Participant[]> = this.conversationComponentStore.otherParticipants$;

  conversationTitle$: Observable<string> = this.conversationComponentStore.conversationTitle$;

  messages$: Observable<Message[]> = this.conversationComponentStore.messages$;

  newMessage: string;

  constructor(
    private readonly conversationComponentStore: ConversationComponentStore,
  ) {}

  ngOnInit(): void {
    this.conversationComponentStore.getConversation();
    this.conversationTitle$.subscribe(console.log)
  }

  /** Fetch additional pages from message paginator. */
  loadMoreMessages(): void {
    console.log('load more');
    this.conversationComponentStore.getNextMessagePage();
  }

  sendMessage() {
    this.conversationComponentStore.currentUser$.pipe(take(1)).subscribe((user) => {
      const message = `${user.friendlyName}:\n` + this.newMessage;
      this.newMessage = null;
      this.conversationComponentStore.sendMessage(message);
    });
  }
}
