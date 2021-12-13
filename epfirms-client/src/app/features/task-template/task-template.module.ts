import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateListComponent } from './task-template-list/task-template-list.component';
import { TaskTemplateListItemComponent } from './task-template-list-item/task-template-list-item.component';
import { TippyModule } from '@ngneat/helipopper';
import { TaskTemplateDetailsComponent } from './task-template-details/task-template-details.component';
import { FormsModule } from '@angular/forms';
import { TaskTemplateSelectionComponent } from './task-template-selection/task-template-selection.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { TaskFileModule } from '../task-file/task-file.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { EditableModule } from '@app/shared/editable/editable.module';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { InputModule } from '@app/shared/input/input.module';


@NgModule({
  declarations: [
    TaskTemplateListItemComponent,
    TaskTemplateListComponent,
    TaskTemplateDetailsComponent,
    TaskTemplateSelectionComponent
  ],
  imports: [
    CoreModule,
    TippyModule,
    TaskFileModule,
    AngularMyDatePickerModule,
    PipesModule,
    AutocompleteModule,
    InputMaskModule,
    EditableModule,
    AvatarModule,
    InputModule
  ],
  exports: [
    TaskTemplateListComponent,
    TaskTemplateSelectionComponent
  ]
})
export class TaskTemplateModule { }
