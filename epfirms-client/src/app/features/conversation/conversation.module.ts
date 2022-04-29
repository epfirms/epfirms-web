import { NgModule } from '@angular/core';
import { ConversationHistoryListComponent } from './conversation-history-list/conversation-history-list.component';
import { ConversationHistoryItemComponent } from './conversation-history-item/conversation-history-item.component';
import { ConversationMessageListComponent } from './conversation-message-list/conversation-message-list.component';
import { ConversationMessageItemComponent } from './conversation-message-item/conversation-message-item.component';
import { ConversationComponent } from './conversation/conversation.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { CoreModule } from '@app/core/core.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgScrollbarReachedModule } from 'ngx-scrollbar/reached-event';
import { ConversationDraftComponent } from './conversation-draft/conversation-draft.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { ConversationMatterSelectModalComponent } from './conversation-matter-select-modal/conversation-matter-select-modal.component';
import { MatterModule } from '../matter/matter.module';
import { ConversationNotificationComponent } from './conversation-notification/conversation-notification.component';

@NgModule({
  declarations: [
    ConversationHistoryListComponent,
    ConversationHistoryItemComponent,
    ConversationMessageListComponent,
    ConversationMessageItemComponent,
    ConversationComponent,
    ConversationDraftComponent,
    ConversationMatterSelectModalComponent,
    ConversationNotificationComponent
  ],
  imports: [
    CoreModule,
    NgScrollbarModule,
    PipesModule,
    AutocompleteModule,
    MenuModule,
    InfiniteScrollModule,
    NgScrollbarReachedModule,
    AvatarModule,
    MatterModule
  ],
  exports: [
    ConversationHistoryListComponent,
    ConversationMessageListComponent,
    ConversationComponent,
    ConversationDraftComponent
  ]
})
export class ConversationModule { }
