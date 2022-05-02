import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxComponent } from './combobox/combobox.component';



@NgModule({
  declarations: [
    ComboboxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ComboboxComponent
  ]

})
export class ComboboxModule { }
