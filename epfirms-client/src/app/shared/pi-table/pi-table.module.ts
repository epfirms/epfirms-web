import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PiTableComponent } from './pi-table/pi-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
  declarations: [
    PiTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputMaskModule
  ],
  exports: [
    PiTableComponent
  ]
})
export class PiTableModule { }
