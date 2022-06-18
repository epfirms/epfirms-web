import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseTemplateCommunityPageComponent } from './case-template-community-page/case-template-community-page.component';

const routes: Routes = [
  {path: '', component: CaseTemplateCommunityPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseTemplateCommunityPageRoutingModule { }
