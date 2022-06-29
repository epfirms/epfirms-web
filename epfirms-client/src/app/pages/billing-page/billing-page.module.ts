import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingPageRoutingModule } from './billing-page-routing.module';
import { BillingPageComponent } from './billing-page/billing-page.component';


@NgModule({
  declarations: [
    BillingPageComponent
  ],
  imports: [
    CommonModule,
    BillingPageRoutingModule
  ]
})
export class BillingPageModule { }
