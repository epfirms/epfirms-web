import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Conversation } from '@twilio/conversations';

@Component({
  selector: 'app-conversation-history-list',
  templateUrl: './conversation-history-list.component.html',
  styleUrls: ['./conversation-history-list.component.scss'],
})
export class ConversationHistoryListComponent extends SelectionModel<Conversation> {
  @Input() set conversations(value: Conversation[]) {
    if (!this._conversations.length && value.length) {
      this._conversations = value;
      this.select(this._conversations[0]);
    } else {
      this._conversations = value;
    }
  }

  get conversations() {
    return this._conversations;
  }

  @Input() set selectedConversationSid(value: string | null) {
    const conversation = this.conversations.find((c) => c.sid === value);
    this.select(conversation);
  }

  get selectedConversationSid(): string | null {
    return this.selected.length ? this.selected[0].sid : null;
  }

  @Output() selectedConversationSidChange: EventEmitter<string> = new EventEmitter();

  private _conversations: Conversation[] = [];

  @Output() changed;

  constructor() {
    super(false, []);
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversationSidChange.emit(conversation.sid);
  }
}
