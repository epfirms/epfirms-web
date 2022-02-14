import { NgModule } from '@angular/core';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatComponent } from './chat/chat.component';
import { CoreModule } from '@app/core/core.module';
import { ChatCreationWindowComponent } from './chat-creation-window/chat-creation-window.component';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { MenuModule } from '@app/shared/menu/menu.module';

@NgModule({
  declarations: [
    ChatButtonComponent,
    ChatWindowComponent,
    ChatComponent,
    ChatCreationWindowComponent
  ],
  imports: [
    CoreModule,
    AutocompleteModule,
    PipesModule,
    MenuModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
