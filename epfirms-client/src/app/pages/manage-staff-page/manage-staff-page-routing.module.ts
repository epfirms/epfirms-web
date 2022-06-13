import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStaffPageComponent } from './manage-staff-page/manage-staff-page.component';

const routes: Routes = [
  {path: '', component: ManageStaffPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStaffPageRoutingModule { }
