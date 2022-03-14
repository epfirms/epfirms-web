import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from '@twilio/conversations';
import { MessagesPageStore } from '../messages-page.store';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
  providers: [MessagesPageStore],
})
export class MessagesPageComponent implements OnInit {
  selectedConversation$ = this.messagesPageStore.selectedConversation$;

  conversationItems$ = this.messagesPageStore.conversationItems$;

  constructor(private readonly messagesPageStore: MessagesPageStore, private router: Router) {}

  ngOnInit(): void {
    this.messagesPageStore.loadConversationItems();
  }

  setSelectedConversation(conversation: Conversation | null = null) {
    this.messagesPageStore.selectConversation(conversation);
  }
}
