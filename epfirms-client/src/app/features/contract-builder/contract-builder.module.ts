import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractEditorComponent } from './contract-editor/contract-editor.component';
import { EditableModule } from '@app/shared/editable/editable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractViewerComponent } from './contract-viewer/contract-viewer.component';
import { ContractBuilderComponent } from './contract-builder/contract-builder.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { ContractEditorV2Component } from './contract-editor-v2/contract-editor-v2.component';
import { QuillModule } from 'ngx-quill';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TemplateSelectorComponent } from './contract-editor-v2/template-selector/template-selector.component';

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
    ContractEditorV2Component,
    TemplateSelectorComponent,
    
  ],
  imports: [
    CommonModule,
    EditableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ContractBuilderRoute),
    QuillModule, 
    NgScrollbarModule
  ],
  exports: [
    ContractEditorComponent,
    ContractViewerComponent,
    ContractBuilderComponent,
    
  ]
})
export class ContractBuilderModule { }
