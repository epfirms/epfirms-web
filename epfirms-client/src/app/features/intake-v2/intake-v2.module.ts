import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientIntakeComponent } from './client-intake/client-intake.component';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { IncomeComponent } from './income/income.component';



@NgModule({
  declarations: [
    ClientIntakeComponent,
    PersonalInformationComponent,
    IncomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule
  ],
  exports: [
    ClientIntakeComponent,
    PersonalInformationComponent
  ]
})
export class IntakeV2Module { }
