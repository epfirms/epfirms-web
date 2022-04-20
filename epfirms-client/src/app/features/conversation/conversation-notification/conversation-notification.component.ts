import { Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/features/user/interfaces/user';
import { HotToastRef } from '@ngneat/hot-toast';
import { Message } from '@twilio/conversations';
import { ConversationNotification } from '../interfaces/conversation-notification';

@Component({
  selector: 'app-conversation-notification',
  templateUrl: './conversation-notification.component.html',
  styleUrls: ['./conversation-notification.component.scss']
})
export class ConversationNotificationComponent {
  userProfile: User;

  message: Message;

  constructor(@Optional() @Inject(HotToastRef) public toastRef: HotToastRef<ConversationNotification>, private _router: Router) {
    this.message = this.toastRef.data.message;
    this.userProfile = this.toastRef.data.user;
  }

  viewNotification() {
    this.toastRef.close({dismissedByAction: true});
    this._router.navigate([`/firm/messages/${this.message.conversation.sid}`]);
  }
}
