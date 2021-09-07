import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/shared/_guards/auth.guard';
import { ClientMatterResolver } from '@app/shared/_resolvers/client-portal/client-matter.resolver';
import { CurrentUserResolver } from '@app/shared/_resolvers/current-user.resolver';
import { CaseListComponent } from './case-list/case-list.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientPortalComponent } from './client-portal.component';
import { IntakeFormComponent } from './intake-form/intake-form.component';

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
        {path: '', component: CaseListComponent, canActivate: [AuthGuard]},
        {path: 'intake/:id', component: IntakeFormComponent, canActivate: [AuthGuard]},
      ]},
    ] }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
