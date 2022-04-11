import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeFormComponent } from './income-form/income-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    IncomeFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IncomeFormComponent,
  ]
})
export class IncomeFormModule { }
