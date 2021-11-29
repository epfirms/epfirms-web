import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmHomeComponent } from './firm-home.component';

const routes: Routes = [{ path: '', component: FirmHomeComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmHomeRoutingModule { }
