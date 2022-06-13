import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      { path: 'case-templates/:id', loadChildren: () => import('../case-template-details-page/case-template-details-page.module').then(m => m.CaseTemplateDetailsPageModule) },
      { path: 'case-templates', loadChildren: () => import('../case-template-list-page/case-template-list-page.module').then(m => m.CaseTemplateListPageModule) },
      { path: 'details', loadChildren: () => import('../firm-details-page/firm-details-page.module').then(m => m.FirmDetailsPageModule) },
      { path: 'community-templates/:id', loadChildren: () => import('../community-case-template-details-page/community-case-template-details-page.module').then(m => m.CommunityCaseTemplateDetailsPageModule) },
      { path: 'community-templates', loadChildren: () => import('../case-template-community-page/case-template-community-page.module').then(m => m.CaseTemplateCommunityPageModule) },
      { path: 'billing', loadChildren: () => import('../billing-page/billing-page.module').then(m => m.BillingPageModule) },
      { path: 'balance/payment-method', loadChildren: () => import('../save-payment-method-page/save-payment-method-page.module').then(m => m.SavePaymentMethodPageModule) },
      { path: 'balance', loadChildren: () => import('../balance-page/balance-page.module').then(m => m.BalancePageModule) },
      { path: 'contracts', loadChildren: () => import('../contract-templates-page/contract-templates-page.module').then(m => m.ContractTemplatesPageModule) },
      { path: 'staff', loadChildren: () => import('../manage-staff-page/manage-staff-page.module').then(m => m.ManageStaffPageModule) },
      { path: '', pathMatch: 'full', redirectTo: 'details'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
