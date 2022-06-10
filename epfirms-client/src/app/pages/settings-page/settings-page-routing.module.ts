import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
    children: [
      { path: 'case-templates/:id', loadChildren: () => import('../case-template-details-page/case-template-details-page.module').then(m => m.CaseTemplateDetailsPageModule) },
      { path: 'case-templates', loadChildren: () => import('../case-template-list-page/case-template-list-page.module').then(m => m.CaseTemplateListPageModule) },

      { path: '', pathMatch: 'full', redirectTo: 'profile'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
