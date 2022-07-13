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
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SpouseInformationComponent } from './spouse-information/spouse-information.component';
import { ChildrenInformationComponent } from './children-information/children-information.component';
import { OtherFamilyInformationComponent } from './other-family-information/other-family-information.component';
import { EstatePlanningFormComponent } from './firm-intake-components/estate-planning-form/estate-planning-form.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { TippyModule } from '@ngneat/helipopper';
import { ProbateIntakeComponent } from './probate-intake/probate-intake.component';
import { ComboboxModule } from '@app/shared/combobox/combobox.module';
import { LifeInsuranceComponent } from './life-insurance/life-insurance.component';
import { ClientEstatePlanningIntakeComponent } from './client-intake-components/client-estate-planning-intake/client-estate-planning-intake.component';
import { EstatePlanningWorkflowComponent } from './estate-planning-workflow/estate-planning-workflow.component';
import { ProbateWorkflowComponent } from './probate-workflow/probate-workflow.component';
import { PersonalRepresentativeInformationComponent } from './personal-representative-information/personal-representative-information.component';
import { DecedentInformationComponent } from './decedent-information/decedent-information.component';
import { DecedentPropertyComponent } from './decedent-property/decedent-property.component';
import { IntakeSettingsOverlayComponent } from './firm-intake-viewer/intake-settings-overlay/intake-settings-overlay.component';
import { BillingSetupComponent } from './billing-setup/billing-setup.component';
import { ElderLawWorkflowComponent } from './elder-law-workflow/elder-law-workflow.component';
import { CaregiverInformationComponent } from './caregiver-information/caregiver-information.component';
import { WardInformationComponent } from './ward-information/ward-information.component';
import { PiTableModule } from '@app/shared/pi-table/pi-table.module';



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
    ProfileCardComponent,
    SpouseInformationComponent,
    ChildrenInformationComponent,
    OtherFamilyInformationComponent,
    EstatePlanningFormComponent,
    ProbateIntakeComponent,
    LifeInsuranceComponent,
    ClientEstatePlanningIntakeComponent,
    EstatePlanningWorkflowComponent,
    ProbateWorkflowComponent,
    PersonalRepresentativeInformationComponent,
    DecedentInformationComponent,
    DecedentPropertyComponent,
    IntakeSettingsOverlayComponent,
    BillingSetupComponent,
    ElderLawWorkflowComponent,
    CaregiverInformationComponent,
    WardInformationComponent,
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
    ReactiveFormsModule,
    InputMaskModule,
    TippyModule,
    NgScrollbarModule,
    ComboboxModule,
    PiTableModule,
    ComboboxModule
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
