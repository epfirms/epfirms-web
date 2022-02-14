import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';



@NgModule({
  declarations: [
    ContractEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContractEditorComponent
  ]
})
export class ContractBuilderModule { }
