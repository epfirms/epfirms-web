import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientIntakeComponent } from './client-intake/client-intake.component';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { IncomeComponent } from './income/income.component';
import { AssetsComponent } from './assets/assets.component';
import { IntakeDialogComponent } from './intake-dialog/intake-dialog.component';
import { FirmIntakeViewerComponent } from './firm-intake-viewer/firm-intake-viewer.component';
import { EstateLawIntakeComponent } from './estate-law-intake/estate-law-intake.component';



@NgModule({
  declarations: [
    ClientIntakeComponent,
    PersonalInformationComponent,
    IncomeComponent,
    AssetsComponent,
    IntakeDialogComponent,
    FirmIntakeViewerComponent,
    EstateLawIntakeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule
  ],
  exports: [
    ClientIntakeComponent,
    PersonalInformationComponent,
    FirmIntakeViewerComponent,
  ]
})
export class IntakeV2Module { }
