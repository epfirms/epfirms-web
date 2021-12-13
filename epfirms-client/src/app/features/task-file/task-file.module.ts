import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFileButtonComponent } from './task-file-button/task-file-button.component';
import { TippyModule } from '@ngneat/helipopper';



@NgModule({
  declarations: [
    TaskFileButtonComponent
  ],
  imports: [
    CommonModule,
    TippyModule
  ],
  exports: [
    TaskFileButtonComponent
  ]
})
export class TaskFileModule { }
