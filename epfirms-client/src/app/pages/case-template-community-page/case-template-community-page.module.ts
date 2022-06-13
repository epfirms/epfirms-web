import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaseTemplateCommunityPageRoutingModule } from './case-template-community-page-routing.module';
import { CaseTemplateCommunityPageComponent } from './case-template-community-page/case-template-community-page.component';
import { CaseTemplateCommunityModule } from '@app/features/case-template-community/case-template-community.module';


@NgModule({
  declarations: [
    CaseTemplateCommunityPageComponent
  ],
  imports: [
    CommonModule,
    CaseTemplateCommunityPageRoutingModule,
    CaseTemplateCommunityModule,
  ]
})
export class CaseTemplateCommunityPageModule { }
