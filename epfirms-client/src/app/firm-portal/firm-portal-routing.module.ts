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
import { FirmPortalComponent } from './firm-portal.component';

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
      {path: '', canActivate: [AuthGuard], loadChildren: () =>
      import('./firm-home/firm-home.module').then(
        (m) => m.FirmHomeModule
      )},
      {path: 'clients', canActivate: [AuthGuard], loadChildren: () =>
      import('./client-directory/client-directory.module').then(
        (m) => m.ClientDirectoryModule
      )},
      {path: 'cases', canActivate: [AuthGuard], loadChildren: () =>
      import('./cases/cases.module').then(
        (m) => m.CasesPageModule
      )},
      {path: 'leads', canActivate: [AuthGuard], loadChildren: () =>
      import('./leads/leads.module').then(
        (m) => m.LeadsPageModule
      )},
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
