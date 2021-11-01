import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegalAreasComponent } from './legal-areas/legal-areas/legal-areas.component';
import { DeleteFirmComponent } from './delete-firm/delete-firm/delete-firm.component';
import { TaskTemplatesComponent } from './task-templates/task-templates/task-templates.component';
import { FirmSettingsComponent } from './firm-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/_guards/auth.guard';
import { FirmDetailsComponent } from './firm-details/firm-details/firm-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';

const FirmSettingsRoute: Routes = [
  {
    path: '', component: FirmSettingsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: FirmDetailsComponent },
      { path: 'legal-areas', component: LegalAreasComponent },
      { path: 'manage-staff', component: ManageStaffComponent },
      { path: 'task-templates', component: TaskTemplatesComponent },
      { path: 'delete-firm', component: DeleteFirmComponent }
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
    ManageStaffComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(FirmSettingsRoute),
    SharedModule
  ]
})
export class FirmSettingsModule { }
