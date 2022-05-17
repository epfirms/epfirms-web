import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmBillingMainComponent } from './firm/firm-billing-main/firm-billing-main.component';
import { FlatRateViewComponent } from './firm/flat-rate-view/flat-rate-view.component';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';
import { HourlyRateViewComponent } from './firm/hourly-rate-view/hourly-rate-view.component';
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
  declarations: [
    FirmBillingMainComponent,
    FlatRateViewComponent,
    HourlyRateViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule,
    InputMaskModule,
  ],
  exports: [
    FirmBillingMainComponent
  ]
})
export class BillingV2Module { }
