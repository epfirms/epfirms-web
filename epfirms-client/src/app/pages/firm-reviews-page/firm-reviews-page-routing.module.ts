import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirmReviewsPageComponent } from './firm-reviews-page/firm-reviews-page.component';

const routes: Routes = [{path:'', component: FirmReviewsPageComponent, data: {title: 'Reviews'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirmReviewsPageRoutingModule { }
