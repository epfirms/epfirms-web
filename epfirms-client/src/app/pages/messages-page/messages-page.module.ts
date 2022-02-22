import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesPageComponent } from './messages-page/messages-page.component';
import { MessagesPageRoutingModule } from './messages-page-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    MessagesPageComponent
  ],
  imports: [
    CommonModule,
    MessagesPageRoutingModule,
    NgScrollbarModule
  ]
})
export class MessagesPageModule { }
