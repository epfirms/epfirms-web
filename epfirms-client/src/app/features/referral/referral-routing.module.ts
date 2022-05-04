import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralStatsComponent } from './referral-stats/referral-stats.component';

const routes: Routes = [
  {path: '', component: ReferralStatsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralRoutingModule { }
