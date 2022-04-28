import { Component, OnInit } from '@angular/core';
import { Matter } from '@app/core/interfaces/matter';
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

  otherParticipants$: Observable<Participant[]> = this.conversationComponentStore.otherParticipants$;

  conversationTitle$: Observable<string> = this.conversationComponentStore.conversationTitle$;

  messages$: Observable<Message[]> = this.conversationComponentStore.messages$;

  matter$: Observable<Matter> = this.conversationComponentStore.matter$;

  newMessage: string;

  constructor(
    private readonly conversationComponentStore: ConversationComponentStore,
  ) {}

  ngOnInit(): void {
    this.conversationComponentStore.getConversation();
  }

  /** Fetch additional pages from message paginator. */
  loadMoreMessages(): void {
    this.conversationComponentStore.getNextMessagePage();
  }

  sendMessage() {
    this.conversationComponentStore.sendMessage(this.newMessage);
    this.newMessage = null;
  }
}
