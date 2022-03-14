import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversationComponent } from '@app/features/conversation/conversation/conversation.component';
import { MessagesPageComponent } from './messages-page/messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesPageComponent,
    children: [{ path: ':id', component: ConversationComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
