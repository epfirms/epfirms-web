import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStaffPageRoutingModule } from './manage-staff-page-routing.module';
import { ManageStaffPageComponent } from './manage-staff-page/manage-staff-page.component';
import { FirmStaffModule } from '@app/features/firm-staff/firm-staff.module';


@NgModule({
  declarations: [
    ManageStaffPageComponent
  ],
  imports: [
    CommonModule,
    ManageStaffPageRoutingModule,
    FirmStaffModule
  ]
})
export class ManageStaffPageModule { }
