import { NgModule } from '@angular/core';
import { SavePaymentMethodPageRoutingModule } from './save-payment-method-page-routing.module';
import { SavePaymentMethodComponent } from './save-payment-method/save-payment-method.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CoreModule } from '@app/core/core.module';
import { ButtonModule } from '@app/shared/button/button.module';


@NgModule({
  declarations: [
    SavePaymentMethodComponent
  ],
  imports: [
    CoreModule,
    SavePaymentMethodPageRoutingModule,
    NgxStripeModule,
    ButtonModule
  ]
})
export class SavePaymentMethodPageModule { }
