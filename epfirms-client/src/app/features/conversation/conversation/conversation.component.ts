import { Component, OnInit } from '@angular/core';
import { Conversation, Message, Participant } from '@twilio/conversations';
import { Observable } from 'rxjs';
import { ConversationComponentStore } from './conversation.component-store';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
  providers: [ConversationComponentStore],
})
export class ConversationComponent implements OnInit {
  conversation$: Observable<Conversation> = this.conversationComponentStore.conversation$;

  otherParticipant$: Observable<Participant> = this.conversationComponentStore.otherParticipant$;

  messages$: Observable<Message[]> = this.conversationComponentStore.messages$;

  newMessage: string;

  constructor(
    private readonly conversationComponentStore: ConversationComponentStore,
  ) {}

  ngOnInit(): void {
    this.conversationComponentStore.getConversation();
    this.conversation$.subscribe(c => console.log(c)); 
  }

  /** Fetch additional pages from message paginator. */
  loadMoreMessages(): void {
    console.log('load more');
    this.conversationComponentStore.getNextMessagePage();
  }

  sendMessage() {
    this.conversationComponentStore.sendMessage(this.newMessage);
    this.newMessage = null;
  }
}
