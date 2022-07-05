import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmPortalComponent } from './firm-portal.component';

const routes: Routes = [
  {
    path: '',
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
