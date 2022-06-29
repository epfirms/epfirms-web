import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { CaseTemplateModule } from '@app/features/case-template/case-template.module';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { CaseTemplateListPageRoutingModule } from './case-template-list-page-routing.module';
import { CaseTemplateListPageComponent } from './case-template-list-page/case-template-list-page.component';



@NgModule({
  declarations: [
    CaseTemplateListPageComponent
  ],
  imports: [
    CoreModule,
    CaseTemplateListPageRoutingModule,
    CaseTemplateModule,
    AccordionModule
  ]
})
export class CaseTemplateListPageModule { }
