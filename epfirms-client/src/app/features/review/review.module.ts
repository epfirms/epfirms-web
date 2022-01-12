import { NgModule } from '@angular/core';
import { ReviewFormComponent } from './review-form/review-form.component';
import { CoreModule } from '@app/core/core.module';
import { ReviewTableComponent } from './review-table/review-table.component';
import { PaginatorModule } from '@app/shared/paginator/paginator.module';

@NgModule({
  declarations: [
    ReviewFormComponent,
    ReviewTableComponent
  ],
  imports: [
    CoreModule,
    PaginatorModule
  ],
  exports: [
    ReviewFormComponent,
    ReviewTableComponent
  ]
})
export class ReviewModule { }
