import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetFormComponent } from './asset-form/asset-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AssetFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AssetFormComponent
  ]
})
export class AssetFormModule { }
