import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavePaymentMethodComponent } from './save-payment-method/save-payment-method.component';

const routes: Routes = [
  {path: '', component: SavePaymentMethodComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavePaymentMethodPageRoutingModule { }
