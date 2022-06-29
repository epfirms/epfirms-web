import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractTemplatesPageRoutingModule } from './contract-templates-page-routing.module';
import { ContractTemplatesPageComponent } from './contract-templates-page/contract-templates-page.component';
import { ContractBuilderModule } from '@app/features/contract-builder/contract-builder.module';


@NgModule({
  declarations: [
    ContractTemplatesPageComponent
  ],
  imports: [
    CommonModule,
    ContractTemplatesPageRoutingModule,
    ContractBuilderModule
  ]
})
export class ContractTemplatesPageModule { }
