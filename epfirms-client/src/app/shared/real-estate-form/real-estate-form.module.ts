import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealEstateFormComponent } from './real-estate-form/real-estate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RealEstateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RealEstateFormComponent
  ]
})
export class RealEstateFormModule { }
