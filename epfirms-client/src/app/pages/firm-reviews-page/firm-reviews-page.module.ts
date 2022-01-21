import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirmReviewsPageRoutingModule } from './firm-reviews-page-routing.module';
import { FirmReviewsPageComponent } from './firm-reviews-page/firm-reviews-page.component';
import { ReviewModule } from '@app/features/review/review.module';


@NgModule({
  declarations: [
    FirmReviewsPageComponent
  ],
  imports: [
    CommonModule,
    FirmReviewsPageRoutingModule,
    ReviewModule
  ]
})
export class FirmReviewsPageModule { }
