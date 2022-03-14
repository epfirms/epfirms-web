import { Component, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
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

  @ViewChild('newMessageIndicator') newMessageIndicator;

  @Input() lastReadMessageIndex: number | null;

  currentUser: User;

  constructor(private _conversationService: ConversationService, private _renderer: Renderer2) {
    this.currentUser = this._conversationService.user;
  }

  test() {
    console.log('scrolledUp');
  }

  test2() {
    console.log('scrolled');
  }

  print(a, b) {
    console.log(a);
    console.log(b);
    console.log(this.scrollbar.viewport);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    if (changes['messageItems']) {
      if (this.scrollbar) {
        console.log(this.newMessageIndicator);
        this.setScrollbarReached();
        this.scrollbar.scrollTo({ top: 9999 });
      }
    }
  }

  setScrollbarReached() {
    const list = this.scrollbar.viewport.nativeElement.firstElementChild;
    const listItems = list.children;
    const lastReadMessage = Array.from(listItems).find(
      (element: HTMLLIElement) =>
        element.nodeName === 'LI' && element.value === this.lastReadMessageIndex,
    );
    console.log(lastReadMessage);
    // const lastReadMessageOffset = this.scrollbar.viewport.nativeElement.firstChild
    // this.scrollbar.offset =
  }
}
