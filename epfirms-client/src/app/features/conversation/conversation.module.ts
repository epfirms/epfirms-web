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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { conversationFeature } from './store/conversation.store';
import { ConversationEffects } from './store/conversation.effects';
import { ConversationDraftComponent } from './conversation-draft/conversation-draft.component';
import { ConversationRoutingModule } from './conversation-routing.module';

@NgModule({
  declarations: [
    ConversationHistoryListComponent,
    ConversationHistoryItemComponent,
    ConversationMessageListComponent,
    ConversationMessageItemComponent,
    ConversationComponent,
    ConversationDraftComponent
  ],
  imports: [
    CoreModule,
    StoreModule.forFeature(conversationFeature),
    EffectsModule.forFeature([ConversationEffects]),
    NgScrollbarModule,
    PipesModule,
    AutocompleteModule,
    MenuModule,
    InfiniteScrollModule,
    NgScrollbarReachedModule,
    ConversationRoutingModule
  ],
  exports: [
    ConversationHistoryListComponent,
    ConversationMessageListComponent,
    ConversationComponent,
    ConversationDraftComponent
  ]
})
export class ConversationModule { }
