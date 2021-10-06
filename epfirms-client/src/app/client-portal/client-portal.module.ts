import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPortalRoutingModule } from './client-portal-routing.module';
import { ClientPortalComponent } from './client-portal.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { SharedModule } from '@app/shared/shared.module';
import { ModalModule } from '@app/modal/modal.module';
import { CaseListComponent } from './case-list/case-list.component';
import { DatepickerModule } from 'ng2-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntakeModule } from '@app/intake/intake.module';


@NgModule({
  declarations: [
    ClientPortalComponent,
    ClientHomeComponent,
    CaseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClientPortalRoutingModule,
    SharedModule,
    ModalModule,
    DatepickerModule,
    IntakeModule
  ]
})
export class ClientPortalModule { }
