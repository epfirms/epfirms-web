import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';
import { FlatRateComponent } from './flat-rate/flat-rate.component';
import { EditableModule } from '@app/shared/editable/editable.module';



@NgModule({
  declarations: [
    ContractEditorComponent,
    FlatRateComponent
  ],
  imports: [
    CommonModule,
    EditableModule
  ],
  exports: [
    ContractEditorComponent,
    FlatRateComponent
  ]
})
export class ContractBuilderModule { }
