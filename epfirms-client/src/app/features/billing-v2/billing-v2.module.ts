import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmBillingMainComponent } from './firm/firm-billing-main/firm-billing-main.component';
import { FlatRateViewComponent } from './firm/flat-rate-view/flat-rate-view.component';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';



@NgModule({
  declarations: [
    FirmBillingMainComponent,
    FlatRateViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule
  ],
  exports: [
    FirmBillingMainComponent
  ]
})
export class BillingV2Module { }
