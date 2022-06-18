import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalancePageComponent } from './balance-page/balance-page.component';

const routes: Routes = [
  {path: '', component: BalancePageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalancePageRoutingModule { }
