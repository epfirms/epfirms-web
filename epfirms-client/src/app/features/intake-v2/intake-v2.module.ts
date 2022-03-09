import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientIntakeComponent } from './client-intake/client-intake.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientIntakeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ClientIntakeComponent
  ]
})
export class IntakeV2Module { }
