import { NgModule } from '@angular/core';
import { ManageBillComponent } from './manage-bill/manage-bill.component';
import { ManageStatementComponent } from './manage-statement/manage-statement.component';
import { CoreModule } from '@app/core/core.module';
import { EditableModule } from '@app/shared/editable/editable.module';



@NgModule({
  declarations: [ManageBillComponent, ManageStatementComponent],
  imports: [
    CoreModule,
    EditableModule
  ],
  exports: [
    ManageBillComponent, ManageStatementComponent
  ]
})
export class BillingModule { }
