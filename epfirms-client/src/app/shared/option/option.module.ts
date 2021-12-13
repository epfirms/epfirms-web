import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionComponent } from './option/option.component';
import { _OptionBase } from './directives/option.directive';


@NgModule({
  declarations: [
    OptionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OptionComponent
  ]
})
export class OptionModule { }
