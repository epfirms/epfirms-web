import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskToolbarComponent } from './task-toolbar/task-toolbar.component';
import { TippyModule } from '@ngneat/helipopper';
import { TaskFileButtonComponent } from './task-file-button/task-file-button.component';
import { TaskSmsButtonComponent } from './task-sms-button/task-sms-button.component';



@NgModule({
  declarations: [
    TaskToolbarComponent,
    TaskFileButtonComponent,
    TaskSmsButtonComponent
  ],
  imports: [
    CommonModule,
    TippyModule
  ],
  exports: [
    TaskToolbarComponent,
  ]
})
export class TaskModule { }
