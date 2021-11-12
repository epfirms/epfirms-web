import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirmPortalRoutingModule } from './firm-portal-routing.module';
import { FirmPortalComponent } from './firm-portal.component';
import { SharedModule } from '../shared/shared.module';
import { FirmHomeComponent } from './firm-home/firm-home.component';
import { ClientDirectoryComponent } from './client-directory/client-directory.component';
import { CasesComponent } from './cases/cases.component';
//import { FirmSettingsComponent } from './firm-settings/firm-settings.component';
import { AddCaseComponent } from './overlays/add-case/add-case.component';
import { AddClientComponent } from './overlays/add-client/add-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatterTabsComponent } from './matter-tabs/matter-tabs.component';
import { OverviewComponent } from './matter-subtabs/overview/overview.component';
import { TasksComponent } from './matter-subtabs/tasks/tasks.component';
import { ActivityComponent } from './matter-subtabs/activity/activity.component';
import { NotesComponent } from './matter-subtabs/notes/notes.component';
import { TabsModule } from '@app/shared/tabs/tabs.module';
import { MenuModule } from 'headlessui-angular';
import { UserInfoComponent } from './matter-tabs/user-info/user-info.component';
import { LeadsComponent } from './leads/leads.component';
import { AddStaffComponent } from './overlays/add-staff/add-staff.component';
import { DeleteStaffComponent } from './overlays/delete-staff/delete-staff.component';
import { IntakeModule } from '@app/features/intake/intake.module';
import { EditClientComponent } from './overlays/edit-client/edit-client.component';
import { CdkTableModule } from '@angular/cdk/table';
import { NgxSelectModule } from 'ngx-select-ex';
import { BillingComponent } from './matter-subtabs/billing/billing.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { EditableModule } from '@ngneat/edit-in-place';
import { TippyModule } from '@ngneat/helipopper';
import { QuillModule } from 'ngx-quill';
import { DialogModule } from '@ngneat/dialog';
import { TaskTemplateModule } from '@app/features/task-template/task-template.module';

@NgModule({
  declarations: [
    FirmPortalComponent,
    FirmHomeComponent,
    ClientDirectoryComponent,
    CasesComponent,
    //FirmSettingsComponent,
    AddCaseComponent,
    AddClientComponent,
    MatterTabsComponent,
    OverviewComponent,
    TasksComponent,
    ActivityComponent,
    NotesComponent,
    UserInfoComponent,
    LeadsComponent,
    AddStaffComponent,
    DeleteStaffComponent,
    EditClientComponent,
    BillingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FirmPortalRoutingModule,
    SharedModule,
    TabsModule,
    MenuModule,
    IntakeModule,
    CdkTableModule,
    NgxSelectModule,
    AngularMyDatePickerModule,
    EditableModule,
    TippyModule,
    QuillModule,
    DialogModule,
    TaskTemplateModule
  ]
})
export class FirmPortalModule {}
