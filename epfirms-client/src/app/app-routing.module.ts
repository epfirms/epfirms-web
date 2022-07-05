import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'firm',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () =>
      import('./firm-portal/firm-portal.module').then(
        (m) => m.FirmPortalModule
      ),
  },
  {
    path: 'client',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () =>
      import('./client-portal/client-portal.module').then(
        (m) => m.ClientPortalModule
      ),
  },
  {
    path: 'review/:uid',
    loadChildren: () =>
    import('./pages/feedback-page/feedback-page.module').then(
      (m) => m.FeedbackPageModule
    )
  },
  {
    path: 'login',
    loadChildren: () =>
    import('./pages/login-page/login-page.module').then(
      (m) => m.LoginPageModule
    )
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./features/user-auth/user-auth.module').then((m) => m.UserAuthModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
