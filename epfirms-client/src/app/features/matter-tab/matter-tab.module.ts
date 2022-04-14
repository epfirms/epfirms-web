import { NgModule } from '@angular/core';
import { MatterTabNavComponent } from './matter-tab-nav/matter-tab-nav.component';
import { MatterTabSidebarComponent } from './matter-tab-sidebar/matter-tab-sidebar.component';
import { MatterTabActionsComponent } from './matter-tab-actions/matter-tab-actions.component';
import { MatterTabContentComponent } from './matter-tab-content/matter-tab-content.component';
import { MatterTabsComponent } from './matter-tabs/matter-tabs.component';
import { MatterTabUserCardComponent } from './matter-tab-user-card/matter-tab-user-card.component';
import { TabsModule } from '@app/shared/tabs/tabs.module';
import { CoreModule } from '@app/core/core.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { MatterTabActivityComponent } from './matter-tab-activity/matter-tab-activity.component';
import { MatterTabBillingComponent } from './matter-tab-billing/matter-tab-billing.component';
import { MatterTabTasksComponent } from './matter-tab-tasks/matter-tab-tasks.component';
import { MatterTabNotesComponent } from './matter-tab-notes/matter-tab-notes.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { QuillModule } from 'ngx-quill';
import { IntakeModule } from '../intake/intake.module';
import { TaskFileModule } from '../task-file/task-file.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { SharedModule } from '@app/shared/shared.module';
import { DocumentsModule } from '../documents/documents.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { InputModule } from '@app/shared/input/input.module';
import { BillingModule } from '../billing/billing.module';
import { MenuModule } from '@app/shared/menu/menu.module';
import { ContractBuilderModule } from '../contract-builder/contract-builder.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { IntakeV2Module } from '../intake-v2/intake-v2.module';
import { MatterModule } from '../matter/matter.module';
import { TippyModule } from '@ngneat/helipopper';



@NgModule({
  declarations: [
    MatterTabNavComponent,
    MatterTabSidebarComponent,
    MatterTabActionsComponent,
    MatterTabContentComponent,
    MatterTabsComponent,
    MatterTabUserCardComponent,
    MatterTabActivityComponent,
    MatterTabBillingComponent,
    MatterTabTasksComponent,
    MatterTabNotesComponent
  ],
  imports: [
    CoreModule,
    TabsModule,
    TagModule,
    AvatarModule,
    QuillModule,
    IntakeModule,
    TaskFileModule,
    EditableModule,
    DocumentsModule,
    SharedModule,
    AutocompleteModule,
    InputModule,
    BillingModule,
    MenuModule,
    ContractBuilderModule,
    ModalModule,
    IntakeV2Module,
    MatterModule,
    TippyModule
  ],
  exports: [
    MatterTabsComponent
  ]
})
export class MatterTabModule { }
