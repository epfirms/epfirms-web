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
import { BillingIntegrationComponent } from './billing-integration/billing-integration/billing-integration.component';
import { FirmStaffModule } from '@app/features/firm-staff/firm-staff.module';
import { CaseTemplateCommunityModule } from '@app/features/case-template-community/case-template-community.module';
import { CaseTemplateCommunityComponent } from './case-template-community/case-template-community.component';
import { CaseTemplateCommunityTableComponent } from '@app/features/case-template-community/case-template-community-table/case-template-community-table.component';
import { CaseTemplateCommunityTemplatePageComponent } from '@app/features/case-template-community/case-template-community-template-page/case-template-community-template-page.component';
import { ContractBuilderComponent } from '@app/features/contract-builder/contract-builder/contract-builder.component';
import { BillingOverviewComponent } from './billing-overview/billing-overview.component';
import { NgxStripeModule } from 'ngx-stripe';
import { InputMaskModule } from '@ngneat/input-mask';
import { BillingPaymentComponent } from './billing-payment/billing-payment.component';
import { ButtonModule } from '@app/shared/button/button.module';
import { BillingSavePaymentMethodComponent } from './billing-save-payment-method/billing-save-payment-method.component';

const FirmSettingsRoute: Routes = [
  {
    path: '', component: FirmSettingsComponent, canActivate: [AuthGuard], children: [
      { path: 'legal-areas', component: LegalAreasComponent },
      { path: 'manage-staff', component: ManageStaffComponent },
      { path: 'delete-firm', component: DeleteFirmComponent },
      { path: 'billing-integration', component: BillingIntegrationComponent},
      { path: 'case-templates', component: CaseTemplatesComponent },
      {path: 'community-templates', children: [
        {path: 'all', component: CaseTemplateCommunityTableComponent},
      {path: ':id', component: CaseTemplateCommunityTemplatePageComponent},
      {path: '', pathMatch: 'full', redirectTo: 'all'}
      ]},
      { path: 'delete-firm', component: DeleteFirmComponent },
      { path: 'profile', component: FirmDetailsComponent },
      {path: 'balance', children: [
        {path: 'overview', component: BillingOverviewComponent},
        {path: 'payment-method', component: BillingSavePaymentMethodComponent},
        {path: ':customer', component: BillingPaymentComponent},
        {path: '', pathMatch: 'full', redirectTo: 'overview'}
      ]},
      { path: '', pathMatch: 'full', redirectTo: 'profile'},
      {path: 'contracts', component: ContractBuilderComponent}
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
    BillingIntegrationComponent,
    CaseTemplateCommunityComponent,
    BillingOverviewComponent,
    BillingPaymentComponent,
    BillingSavePaymentMethodComponent,
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
    FirmStaffModule,
    CaseTemplateCommunityModule,
    NgxStripeModule,
    InputMaskModule,
    ButtonModule
  ]
})
export class FirmSettingsModule { }
