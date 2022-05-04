import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralStatsComponent } from './referral-stats/referral-stats.component';
import { ReferralRoutingModule } from './referral-routing.module';



@NgModule({
  declarations: [
    ReferralStatsComponent
  ],
  imports: [
    CommonModule,
    ReferralRoutingModule,
  ]
})
export class ReferralModule { }
