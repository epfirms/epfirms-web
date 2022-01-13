import { NgModule } from '@angular/core';
import { FeedbackPageRoutingModule } from './feedback-page-routing.module';
import { CoreModule } from '@app/core/core.module';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ReviewModule } from '@app/features/review/review.module';



@NgModule({
  declarations: [
    FeedbackPageComponent
  ],
  imports: [
    CoreModule,
    FeedbackPageRoutingModule,
    ReviewModule
  ]
})
export class FeedbackPageModule { }
