import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';
import { FlatRateComponent } from './flat-rate/flat-rate.component';



@NgModule({
  declarations: [
    ContractEditorComponent,
    FlatRateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContractEditorComponent
  ]
})
export class ContractBuilderModule { }
