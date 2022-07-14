import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirmBillingMainComponent} from './firm/firm-billing-main/firm-billing-main.component';

const routes: Routes = [
  {
    path: '',
    component: FirmBillingMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingV2RoutingModule {}
