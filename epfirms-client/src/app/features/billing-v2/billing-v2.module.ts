import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmBillingMainComponent } from './firm/firm-billing-main/firm-billing-main.component';



@NgModule({
  declarations: [
    FirmBillingMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirmBillingMainComponent
  ]
})
export class BillingV2Module { }
