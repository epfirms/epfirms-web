import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirmBillingMainComponent } from './firm/firm-billing-main/firm-billing-main.component';
import { FlatRateViewComponent } from './firm/flat-rate-view/flat-rate-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';
import { HourlyRateViewComponent } from './firm/hourly-rate-view/hourly-rate-view.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { ComboboxModule } from '@app/shared/combobox/combobox.module';
import { BillingV2RoutingModule } from './billing-v2-routing.module';
import { HotToastModule } from '@ngneat/hot-toast';
import { TippyModule } from '@ngneat/helipopper';
import { CreateInvoiceOverlayComponent } from './firm/create-invoice-overlay/create-invoice-overlay.component';
import { BillingSetupHelpOverlayComponent } from './firm/billing-setup-help-overlay/billing-setup-help-overlay.component';




@NgModule({
  declarations: [
    FirmBillingMainComponent,
    FlatRateViewComponent,
    HourlyRateViewComponent,
    CreateInvoiceOverlayComponent,
    BillingSetupHelpOverlayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule,
    InputMaskModule,
    ComboboxModule,
    BillingV2RoutingModule,
    HotToastModule,
    TippyModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FirmBillingMainComponent
  ]
})
export class BillingV2Module { }
