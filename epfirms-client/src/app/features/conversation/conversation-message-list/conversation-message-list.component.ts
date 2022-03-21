import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Message, User } from '@twilio/conversations';
import { NgScrollbarBase } from 'ngx-scrollbar/lib/ng-scrollbar-base';
import { NgScrollbarReachedTop } from 'ngx-scrollbar/reached-event';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversation-message-list',
  templateUrl: './conversation-message-list.component.html',
  styleUrls: ['./conversation-message-list.component.scss'],
})
export class ConversationMessageListComponent implements OnChanges {
  @Input() messageItems: Message[] = [];

  @ViewChild('scrollbar') scrollbar: NgScrollbarBase & NgScrollbarReachedTop;

  @Input() lastReadMessageIndex: number | null;

  @Output() scrolledTop: EventEmitter<any> = new EventEmitter<any>();

  currentUser: User;

  constructor(private _conversationService: ConversationService) {
    this.currentUser = this._conversationService.user;
  }

  emitReachedTop(event) {
    this.scrolledTop.emit(event);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (changes['messageItems']) {
      if (this.scrollbar) {
        this.scrollbar.scrollTo({ top: 9999 });
      }
    }
  }
}
