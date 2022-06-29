import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseTemplateCommunityTableComponent } from './case-template-community-table/case-template-community-table.component';
import { CaseTemplateCommunityTemplatePageComponent } from './case-template-community-template-page/case-template-community-template-page.component';
import { CaseTemplateModule } from '../case-template/case-template.module';
import { RouterModule } from '@angular/router';
import { EditableModule } from '@app/shared/editable/editable.module';



@NgModule({
  declarations: [
    CaseTemplateCommunityTableComponent,
    CaseTemplateCommunityTemplatePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CaseTemplateModule,
    EditableModule,
  ],
  exports: [
    CaseTemplateCommunityTableComponent
  ]
})
export class CaseTemplateCommunityModule { }
