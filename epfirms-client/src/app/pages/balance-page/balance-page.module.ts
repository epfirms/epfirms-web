import { NgModule } from '@angular/core';
import { BalancePageRoutingModule } from './balance-page-routing.module';
import { BalancePageComponent } from './balance-page/balance-page.component';
import { NgxStripeModule } from 'ngx-stripe';
import { InputMaskModule } from '@ngneat/input-mask';
import { CoreModule } from '@app/core/core.module';
import { ButtonModule } from '@app/shared/button/button.module';
import { BalanceModule } from '@app/features/balance/balance.module';


@NgModule({
  declarations: [
    BalancePageComponent
  ],
  imports: [
    CoreModule,
    BalancePageRoutingModule,
    NgxStripeModule,
    InputMaskModule,
    ButtonModule,
    BalanceModule
  ]
})
export class BalancePageModule { }
