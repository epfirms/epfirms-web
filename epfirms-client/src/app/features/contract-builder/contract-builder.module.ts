import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';
import { FlatRateComponent } from './flat-rate/flat-rate.component';
import { EditableModule } from '@app/shared/editable/editable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContractEditorComponent,
    FlatRateComponent
  ],
  imports: [
    CommonModule,
    EditableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ContractEditorComponent,
    FlatRateComponent
  ]
})
export class ContractBuilderModule { }
