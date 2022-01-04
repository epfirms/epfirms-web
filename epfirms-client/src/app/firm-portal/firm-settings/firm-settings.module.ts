import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegalAreasComponent } from './legal-areas/legal-areas/legal-areas.component';
import { DeleteFirmComponent } from './delete-firm/delete-firm/delete-firm.component';
import { TaskTemplatesComponent } from './task-templates/task-templates/task-templates.component';
import { FirmSettingsComponent } from './firm-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { FirmDetailsComponent } from './firm-details/firm-details/firm-details.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule } from '@ngneat/helipopper';
import { TaskTemplateModule } from '@app/features/task-template/task-template.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { BillingIntegrationComponent } from './billing-integration/billing-integration/billing-integration.component';

const FirmSettingsRoute: Routes = [
  {
    path: '', component: FirmSettingsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: FirmDetailsComponent },
      { path: 'legal-areas', component: LegalAreasComponent },
      { path: 'manage-staff', component: ManageStaffComponent },
      { path: 'task-templates', component: TaskTemplatesComponent },
      { path: 'delete-firm', component: DeleteFirmComponent },
      { path: 'billing-integration', component: BillingIntegrationComponent}
    ]
  },
]

@NgModule({
  declarations: [
    LegalAreasComponent,
    DeleteFirmComponent,
    TaskTemplatesComponent,
    FirmSettingsComponent,
    FirmDetailsComponent,
    ManageStaffComponent,
    BillingIntegrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(FirmSettingsRoute),
    DialogModule,
    TippyModule,
    TaskTemplateModule,
    TagModule,
    EditableModule
  ]
})
export class FirmSettingsModule { }
