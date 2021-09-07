import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/_guards/auth.guard';

const routes: Routes = [
  {
    path: 'firm',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./firm-portal/firm-portal.module').then(
        (m) => m.FirmPortalModule
      ),
  },
  {
    path: 'client',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./client-portal/client-portal.module').then(
        (m) => m.ClientPortalModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./user-auth/user-auth.module').then((m) => m.UserAuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
