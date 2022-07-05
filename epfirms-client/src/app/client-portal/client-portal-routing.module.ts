import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ClientMatterResolver } from '@app/core/resolvers/client-portal/client-matter.resolver';
import { CurrentUserResolver } from '@app/core/resolvers/current-user.resolver';
import { IntakeMainComponent } from '@app/features/intake-v2/intake-main/intake-main.component';
import { ClientContractsComponent } from './client-contracts/client-contracts.component';
import { ClientDocumentsComponent } from './client-documents/client-documents.component';
import { ClientFinancialsComponent } from './client-financials/client-financials.component';
import { ClientPortalComponent } from './client-portal.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    resolve: {
      currentUser: CurrentUserResolver,
      matters: ClientMatterResolver,
    },
    component: ClientPortalComponent,
    children: [{ path: '', canActivate: [AngularFireAuthGuard], children: [
      {path: '', component: IntakeMainComponent, canActivate: [AngularFireAuthGuard], children: [
        // removing the case list for now because we have a separate intake section now
        // {path: '', component: CaseListComponent, canActivate: [AuthGuard]}
      ]},
      {path: 'documents', component: ClientDocumentsComponent, canActivate: [AngularFireAuthGuard]},
      {path: 'financials', component: ClientFinancialsComponent, canActivate: [AngularFireAuthGuard]},
      {path: 'contracts', component: ClientContractsComponent, canActivate: [AngularFireAuthGuard]},
      // {path: 'intake', component: IntakeMainComponent, canActivate: [AuthGuard]}
    ] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
