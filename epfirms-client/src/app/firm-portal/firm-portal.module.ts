import { NgModule } from '@angular/core';

import { FirmPortalRoutingModule } from './firm-portal-routing.module';
import { FirmPortalComponent } from './firm-portal.component';
import { AddCaseComponent } from './overlays/add-case/add-case.component';
import { AddClientComponent } from './overlays/add-client/add-client.component';
import { EditClientComponent } from './overlays/edit-client/edit-client.component';
import { QuillModule } from 'ngx-quill';
import { DialogModule } from '@ngneat/dialog';
import { CoreModule } from '@app/core/core.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { MatterTabModule } from '@app/features/matter-tab/matter-tab.module';
import { NavbarModule } from '@app/shared/navbar/navbar.module';
import { SharedModule } from '@app/shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InputModule } from '@app/shared/input/input.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { ConversationEffects } from '@app/features/conversation/store/conversation.effects';
import { conversationFeature } from '@app/features/conversation/store/conversation.store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    FirmPortalComponent,
    AddCaseComponent,
    AddClientComponent,
    EditClientComponent
  ],
  imports: [
    CoreModule,
    FirmPortalRoutingModule,
    DialogModule,
    QuillModule,
    AutocompleteModule,
    TagModule,
    AvatarModule,
    MatterTabModule,
    NavbarModule,
    SharedModule,
    ScrollingModule,
    InputModule,
    MenuModule,
    ModalModule,
    InputMaskModule,
    StoreModule.forFeature(conversationFeature),
    EffectsModule.forFeature([ConversationEffects]),
  ]
})
export class FirmPortalModule {}
