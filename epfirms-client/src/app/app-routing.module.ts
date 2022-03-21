import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

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
    path: 'review/:uid',
    loadChildren: () =>
    import('./pages/feedback-page/feedback-page.module').then(
      (m) => m.FeedbackPageModule
    )
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/user-auth/user-auth.module').then((m) => m.UserAuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
