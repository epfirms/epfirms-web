import { NgModule } from '@angular/core';
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { ManageStatementComponent } from './manage-statement/manage-statement.component';
import { CoreModule } from '@app/core/core.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { LegalInsuranceComponent } from './legal-insurance/legal-insurance.component';
import { MonthlyPaymentComponent } from './monthly-payment/monthly-payment.component';



@NgModule({
  declarations: [ManageBillComponent, ManageStatementComponent, LegalInsuranceComponent, MonthlyPaymentComponent],
  imports: [
    CoreModule,
    EditableModule
  ],
  exports: [
    ManageBillComponent, ManageStatementComponent, LegalInsuranceComponent, MonthlyPaymentComponent
  ]
})
export class BillingModule { }
