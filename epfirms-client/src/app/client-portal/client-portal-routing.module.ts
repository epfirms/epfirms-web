import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ClientMatterResolver } from '@app/core/resolvers/client-portal/client-matter.resolver';
import { CurrentUserResolver } from '@app/core/resolvers/current-user.resolver';
import { ClientIntakeComponent } from '@app/features/intake-v2/client-intake/client-intake.component';
import { IntakeMainComponent } from '@app/features/intake-v2/intake-main/intake-main.component';
import { CaseListComponent } from './case-list/case-list.component';
import { ClientContractsComponent } from './client-contracts/client-contracts.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { ClientFinancialsComponent } from './client-financials/client-financials.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientPortalComponent } from './client-portal.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      currentUser: CurrentUserResolver,
      matters: ClientMatterResolver,
    },
    component: ClientPortalComponent,
    children: [{ path: '', canActivate: [AuthGuard], children: [
      {path: '', component: ClientHomeComponent, canActivate: [AuthGuard], children: [
        // removing the case list for now because we have a separate intake section now
        // {path: '', component: CaseListComponent, canActivate: [AuthGuard]}
      ]},
      {path: 'documents', component: ClientDocumentsComponent, canActivate: [AuthGuard]},
      {path: 'financials', component: ClientFinancialsComponent, canActivate: [AuthGuard]},
      {path: 'contracts', component: ClientContractsComponent, canActivate: [AuthGuard]},
      {path: 'intake', component: IntakeMainComponent, canActivate: [AuthGuard]}
    ] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
