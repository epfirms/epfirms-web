import { NgModule } from '@angular/core';
import { ReviewFormComponent } from './review-form/review-form.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [
    ReviewFormComponent
  ],
  imports: [
    CoreModule
  ],
  exports: [
    ReviewFormComponent
  ]
})
export class ReviewModule { }
