import { NgModule } from '@angular/core';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { AddAppointeeComponent } from './add-appointee/add-appointee.component';
import { AddFamilyMemberComponent } from './add-family-member/add-family-member.component';
import { AddMoneyAccountComponent } from './add-money-account/add-money-account.component';
import { AddRealEstateComponent } from './add-real-estate/add-real-estate.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  declarations: [
    IntakeFormComponent,
    AddMoneyAccountComponent,
    AddVehicleComponent,
    AddRealEstateComponent,
    AddFamilyMemberComponent,
    AddAppointeeComponent,
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    IntakeFormComponent
  ]
})
export class IntakeModule { }
