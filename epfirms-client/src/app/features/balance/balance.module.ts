import { NgModule } from '@angular/core';
import { BalanceSavePaymentMethodComponent } from './balance-save-payment-method/balance-save-payment-method.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { NgxStripeModule } from 'ngx-stripe';
import { BalanceAddFundsComponent } from './balance-add-funds/balance-add-funds.component';
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
  declarations: [
    BalanceSavePaymentMethodComponent,
    BalanceAddFundsComponent
  ],
  imports: [
    CoreModule,
    RouterModule,
    NgxStripeModule,
    InputMaskModule
  ],
  exports: [
    BalanceSavePaymentMethodComponent,
    BalanceAddFundsComponent
  ]
})
export class BalanceModule { }
