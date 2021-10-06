import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { ModalModule } from '@app/modal/modal.module';



@NgModule({
  declarations: [
    IntakeFormComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ],
  exports: [
    IntakeFormComponent
  ]
})
export class IntakeModule { }
