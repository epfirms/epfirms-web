import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '@app/features/user/interfaces/user';
import { UserService } from '@app/features/user/services/user.service';
import { Message } from '@twilio/conversations';

@Component({
  selector: 'app-conversation-message-item',
  templateUrl: './conversation-message-item.component.html',
  styleUrls: ['./conversation-message-item.component.scss']
})
export class ConversationMessageItemComponent implements OnInit {
  @Input() message: Message;

  @Input() nextMessage: Message;

  @Input() prevMessage: Message;

  @Input() isFirst: boolean;

  @Input() isLast: boolean;

  @Input() lastReadMessageIndex: number | null;
  
  @Input() type: 'sent' | 'received' = 'received';

  @Input() authorIsCurrentUser: boolean;

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  @Input() isLastReadMessage: boolean;

  user: User;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.get(this.message.author).subscribe(user => { 
      this.user = user;
    });
  }
}
