import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Message } from '@twilio/conversations';

@Component({
  selector: 'app-conversation-message-item',
  templateUrl: './conversation-message-item.component.html',
  styleUrls: ['./conversation-message-item.component.scss']
})
export class ConversationMessageItemComponent {
  @Input() message: Message;
  
  @Input() type: 'sent' | 'received' = 'received';

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  @Input() isLastReadMessage: boolean;
}
