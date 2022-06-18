import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmDetailsPageComponent } from './firm-details-page/firm-details-page.component';

const routes: Routes = [
  {path: '', component: FirmDetailsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmDetailsPageRoutingModule { }
