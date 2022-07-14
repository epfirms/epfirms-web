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
import { StoreModule } from '@ngrx/store';
import * as fromTask from './task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './task.effects';



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
    InputMaskModule,
    StoreModule.forFeature(fromTask.tasksFeatureKey, fromTask.reducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  exports: [
    TaskToolbarComponent,
    TaskFileButtonComponent,
    TaskSmsButtonComponent
  ]
})
export class TaskModule { }
