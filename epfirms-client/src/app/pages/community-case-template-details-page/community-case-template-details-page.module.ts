import { NgModule } from '@angular/core';
import { CommunityCaseTemplateDetailsPageComponent } from './community-case-template-details-page/community-case-template-details-page.component';
import { CoreModule } from '@app/core/core.module';
import { RouterModule } from '@angular/router';
import { TaskModule } from '@app/features/task/task.module';
import { CommunityCaseTemplateDetailsPageRoutingModule } from './community-case-template-details-page-routing.module';



@NgModule({
  declarations: [
    CommunityCaseTemplateDetailsPageComponent
  ],
  imports: [
    CoreModule,
    CommunityCaseTemplateDetailsPageRoutingModule,
    RouterModule,
    TaskModule
  ]
})
export class CommunityCaseTemplateDetailsPageModule { }
