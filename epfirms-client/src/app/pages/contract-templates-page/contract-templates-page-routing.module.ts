import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractTemplatesPageComponent } from './contract-templates-page/contract-templates-page.component';

const routes: Routes = [
  {path: '', component: ContractTemplatesPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractTemplatesPageRoutingModule { }
