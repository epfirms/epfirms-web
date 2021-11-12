import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntakeFormComponent } from './intake-form/intake-form.component';



@NgModule({
  declarations: [
    IntakeFormComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    IntakeFormComponent
  ]
})
export class IntakeModule { }
