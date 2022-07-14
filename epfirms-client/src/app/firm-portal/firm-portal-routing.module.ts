import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientResolver } from '@app/core/resolvers/firm-portal/client.resolver';
import { CurrentFirmResolver } from '@app/core/resolvers/firm-portal/current-firm.resolver';
import { LegalAreaResolver } from '@app/core/resolvers/firm-portal/legal-area.resolver';
import { StaffResolver } from '@app/core/resolvers/firm-portal/staff.resolver';
import { FirmPortalComponent } from './firm-portal.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      clients: ClientResolver,
      currentFirm: CurrentFirmResolver,
      legalAreas: LegalAreaResolver,
      staff: StaffResolver,
    },
    component: FirmPortalComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./firm-home/firm-home.module').then((m) => m.FirmHomeModule),
            data: { title: 'Home' },
          },
          {
            path: 'clients',
            loadChildren: () =>
              import('./client-directory/client-directory.module').then(
                (m) => m.ClientDirectoryModule,
              ),
            data: { title: 'Client Directory' },
          },
          {
            path: 'cases',
            loadChildren: () => import('./cases/cases.module').then((m) => m.CasesPageModule),
            data: { title: 'Cases' },
          },
          {
            path: 'leads',
            loadChildren: () => import('./leads/leads.module').then((m) => m.LeadsPageModule),
            data: { title: 'Leads' },
          },
          {
            path: 'reviews',
            loadChildren: () =>
              import('../pages/firm-reviews-page/firm-reviews-page.module').then(
                (m) => m.FirmReviewsPageModule,
              ),
            data: { title: 'Reviews' },
          },
          {
            path: 'settings',
            loadChildren: () =>
              import('../pages/settings-page/settings-page.module').then(
                (m) => m.SettingsPageModule,
              ),
            data: { title: 'Settings' },
          },
          {
            path: 'messages',
            loadChildren: () =>
              import('../pages/messages-page/messages-page.module').then(
                (m) => m.MessagesPageModule,
              ),
            data: { title: 'Messages' },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirmPortalRoutingModule {}
