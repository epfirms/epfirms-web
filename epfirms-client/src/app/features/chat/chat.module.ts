import { NgModule } from '@angular/core';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatComponent } from './chat/chat.component';
import { CoreModule } from '@app/core/core.module';
import { ChatCreationWindowComponent } from './chat-creation-window/chat-creation-window.component';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { ChatConversationButtonComponent } from './chat-conversation-button/chat-conversation-button.component';
import { TippyModule } from '@ngneat/helipopper';
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    ChatWindowComponent,
    ChatComponent,
    ChatCreationWindowComponent,
    ChatConversationButtonComponent
  ],
  imports: [
    CoreModule,
    AutocompleteModule,
    PipesModule,
    MenuModule,
    TippyModule,
    TextFieldModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
