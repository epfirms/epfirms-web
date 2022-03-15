import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ClientMatterResolver } from '@app/core/resolvers/client-portal/client-matter.resolver';
import { CurrentUserResolver } from '@app/core/resolvers/current-user.resolver';
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
        {path: '', component: CaseListComponent, canActivate: [AuthGuard]}
      ]},
      {path: 'documents', component: ClientDocumentsComponent, canActivate: [AuthGuard]},
      {path: 'financials', component: ClientFinancialsComponent, canActivate: [AuthGuard]},
      {path: 'contracts', component: ClientContractsComponent, canActivate: [AuthGuard]}
    ] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
