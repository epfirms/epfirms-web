import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientIntakeComponent } from './client-intake/client-intake.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditableModule } from '@app/shared/editable/editable.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { IncomeComponent } from './income/income.component';
import { AssetsComponent } from './assets/assets.component';
import { IntakeDialogComponent } from './intake-dialog/intake-dialog.component';
import { FirmIntakeViewerComponent } from './firm-intake-viewer/firm-intake-viewer.component';
import { EstateLawIntakeComponent } from './estate-law-intake/estate-law-intake.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { WillRequestsComponent } from './will-requests/will-requests.component';
import { FirmPersonalInformationComponent } from './firm-intake-components/firm-personal-information/firm-personal-information.component';
import { AppointeesComponent } from './appointees/appointees.component';
import { IntakeMainComponent } from './intake-main/intake-main.component';
import { ExecutorsComponent } from './executors/executors.component';
import { UserProfileFormModule } from '@app/shared/user-profile-form/user-profile-form.module';
import { IncomeFormModule } from '@app/shared/income-form/income-form.module';
import { AssetFormModule } from '@app/shared/asset-form/asset-form.module';
import { RealEstateFormModule } from '@app/shared/real-estate-form/real-estate-form.module';
import { AppointeeFormModule } from '@app/shared/appointee-form/appointee-form.module';
import { ProfileCardComponent } from './firm-intake-components/profile-card/profile-card.component';



@NgModule({
  declarations: [
    ClientIntakeComponent,
    PersonalInformationComponent,
    IncomeComponent,
    AssetsComponent,
    IntakeDialogComponent,
    FirmIntakeViewerComponent,
    EstateLawIntakeComponent,
    RealEstateComponent,
    WillRequestsComponent,
    FirmPersonalInformationComponent,
    AppointeesComponent,
    IntakeMainComponent,
    ExecutorsComponent,
    ProfileCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EditableModule,
    UserProfileFormModule,
    IncomeFormModule,
    AssetFormModule,
    RealEstateFormModule,
    AppointeeFormModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientIntakeComponent,
    PersonalInformationComponent,
    FirmIntakeViewerComponent,
    EstateLawIntakeComponent,
    IntakeMainComponent,
  ]
})
export class IntakeV2Module { }
