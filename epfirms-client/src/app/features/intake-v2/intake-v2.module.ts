import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientIntakeComponent } from './client-intake/client-intake.component';



@NgModule({
  declarations: [
    ClientIntakeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClientIntakeComponent
  ]
})
export class IntakeV2Module { }
