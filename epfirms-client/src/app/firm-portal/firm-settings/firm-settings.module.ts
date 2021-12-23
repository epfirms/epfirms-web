import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LegalAreasComponent } from './legal-areas/legal-areas/legal-areas.component';
import { DeleteFirmComponent } from './delete-firm/delete-firm/delete-firm.component';
import { CaseTemplatesComponent } from './case-templates/case-templates/case-templates.component';
import { FirmSettingsComponent } from './firm-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { FirmDetailsComponent } from './firm-details/firm-details/firm-details.component';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { DialogModule } from '@ngneat/dialog';
import { TippyModule } from '@ngneat/helipopper';
import { CaseTemplateModule } from '@app/features/case-template/case-template.module';
import { TagModule } from '@app/shared/tag/tag.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { CaseTemplateCommunityComponent } from './case-template-community/case-template-community.component';
import { FirmStaffModule } from '@app/features/firm-staff/firm-staff.module';

const FirmSettingsRoute: Routes = [
  {
    path: '', component: FirmSettingsComponent, canActivate: [AuthGuard], children: [
      { path: '', component: FirmDetailsComponent },
      { path: 'legal-areas', component: LegalAreasComponent },
      { path: 'manage-staff', component: ManageStaffComponent },
      { path: 'case-templates', component: CaseTemplatesComponent },
      { path: 'case-template-community', component: CaseTemplateCommunityComponent },
      { path: 'delete-firm', component: DeleteFirmComponent }
    ]
  },
]

@NgModule({
  declarations: [
    LegalAreasComponent,
    DeleteFirmComponent,
    CaseTemplatesComponent,
    FirmSettingsComponent,
    FirmDetailsComponent,
    ManageStaffComponent,
    CaseTemplateCommunityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(FirmSettingsRoute),
    DialogModule,
    TippyModule,
    CaseTemplateModule,
    TagModule,
    EditableModule,
    FirmStaffModule
  ]
})
export class FirmSettingsModule { }
