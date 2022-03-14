import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Conversation } from '@twilio/conversations';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-conversation-history-list',
  templateUrl: './conversation-history-list.component.html',
  styleUrls: ['./conversation-history-list.component.scss'],
})
export class ConversationHistoryListComponent
  extends SelectionModel<Conversation>
  implements OnInit, OnDestroy
{
  @Input() set conversations(value: Conversation[]) {
    if (!this._conversations.length && value.length) {
      this._conversations = value;
      this.select(this._conversations[0]);
      this.selectedConversationChange.emit(this._conversations[0]);
    } else {
      this._conversations = value;
    }
  }

  get conversations() {
    return this._conversations;
  }

  @Input() set selectedConversation(value: Conversation) {
    this.selectConversation(value);
  }

  get selectedConversation(): Conversation {
    return this.selected[0];
  }

  @Output() selectedConversationChange = new EventEmitter<Conversation>();

  private _conversations: Conversation[] = [];

  destroy$: Subject<void> = new Subject<void>();

  constructor() {
    super(false, []);
  }

  ngOnInit(): void {
    this.changed.pipe(takeUntil(this.destroy$)).subscribe((change) => {
      this.selectedConversationChange.emit(change.added[0]);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectConversation(conversation: Conversation) {
    this.select(conversation);
  }
}
