import { NgModule } from '@angular/core';
import { TaskToolbarComponent } from './task-toolbar/task-toolbar.component';
import { TippyModule } from '@ngneat/helipopper';
import { TaskFileButtonComponent } from './task-file-button/task-file-button.component';
import { TaskSmsButtonComponent } from './task-sms-button/task-sms-button.component';
import { CoreModule } from '@app/core/core.module';
import { InputModule } from '@app/shared/input/input.module';
import { ButtonModule } from '@app/shared/button/button.module';
import { TaskSmsConfirmationComponent } from './task-sms-confirmation/task-sms-confirmation.component';
import { InputMaskModule } from '@ngneat/input-mask';



@NgModule({
  declarations: [
    TaskToolbarComponent,
    TaskFileButtonComponent,
    TaskSmsButtonComponent,
    TaskSmsConfirmationComponent
  ],
  imports: [
    CoreModule,
    TippyModule,
    InputModule,
    ButtonModule,
    InputMaskModule
  ],
  exports: [
    TaskToolbarComponent,
    TaskFileButtonComponent,
    TaskSmsButtonComponent
  ]
})
export class TaskModule { }
