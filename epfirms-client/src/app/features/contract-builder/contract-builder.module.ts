import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';
import { EditableModule } from '@app/shared/editable/editable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractViewerComponent } from './contract-viewer/contract-viewer.component';
import { ContractBuilderComponent } from './contract-builder/contract-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

const ContractBuilderRoute: Routes = [
  {
    path: '', component: ContractBuilderComponent, canActivate: [AuthGuard], 
  },
]


@NgModule({
  declarations: [
    ContractEditorComponent,
    ContractViewerComponent,
    ContractBuilderComponent,
    
  ],
  imports: [
    CommonModule,
    EditableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ContractBuilderRoute)
  ],
  exports: [
    ContractEditorComponent,
    ContractViewerComponent
    
  ]
})
export class ContractBuilderModule { }
