import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { MessagesPageRoutingModule } from './messages-page-routing.module';
import { ConversationModule } from '@app/features/conversation/conversation.module';

@NgModule({
  declarations: [
    MessagesPageComponent
  ],
  imports: [
    CommonModule,
    MessagesPageRoutingModule,
    ConversationModule
  ]
})
export class MessagesPageModule { }
