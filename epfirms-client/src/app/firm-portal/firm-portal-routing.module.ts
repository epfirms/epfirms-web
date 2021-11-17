import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ClientResolver } from '@app/core/resolvers/firm-portal/client.resolver';
import { CurrentFirmResolver } from '@app/core/resolvers/firm-portal/current-firm.resolver';
import { CurrentUserResolver } from '@app/core/resolvers/current-user.resolver';
import { DocumentResolver } from '@app/core/resolvers/firm-portal/document.resolver';
import { LegalAreaResolver } from '@app/core/resolvers/firm-portal/legal-area.resolver';
import { MatterResolver } from '@app/core/resolvers/firm-portal/matter.resolver';
import { StaffResolver } from '@app/core/resolvers/firm-portal/staff.resolver';
import { CasesComponent } from './cases/cases.component';
import { ClientDirectoryComponent } from './client-directory/client-directory.component';
import { FirmHomeComponent } from './firm-home/firm-home.component';
import { FirmPortalComponent } from './firm-portal.component';
import { LeadsComponent } from './leads/leads.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      clients: ClientResolver,
      currentFirm: CurrentFirmResolver,
      currentUser: CurrentUserResolver,
      documents: DocumentResolver,
      legalAreas: LegalAreaResolver,
      matters: MatterResolver,
      staff: StaffResolver
    },
    component: FirmPortalComponent,
    children: [{ path: '', canActivate: [AuthGuard], children: [
      {path: '', component: FirmHomeComponent, canActivate: [AuthGuard]},
      {path: 'clients', component: ClientDirectoryComponent, canActivate: [AuthGuard]},
      {path: 'cases', canActivate: [AuthGuard], loadChildren: () =>
      import('./cases/cases.module').then(
        (m) => m.CasesPageModule
      )},
      {path: 'leads', component: LeadsComponent, canActivate: [AuthGuard]},
      {path: 'settings', canActivate: [AuthGuard], loadChildren: () =>
      import('./firm-settings/firm-settings.module').then(
        (m) => m.FirmSettingsModule
      ),}
    ] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirmPortalRoutingModule {}
