import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointeeFormComponent } from './appointee-form/appointee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppointeeFormComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AppointeeFormComponent
  ]
})
export class AppointeeFormModule { }
