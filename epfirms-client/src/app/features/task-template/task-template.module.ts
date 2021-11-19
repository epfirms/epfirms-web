import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplateListComponent } from './task-template-list/task-template-list.component';
import { TaskTemplateListItemComponent } from './task-template-list-item/task-template-list-item.component';
import { SharedModule } from '@app/shared/shared.module';
import { TippyModule } from '@ngneat/helipopper';
import { TaskTemplateDetailsComponent } from './task-template-details/task-template-details.component';
import { FormsModule } from '@angular/forms';
import { TaskTemplateSelectionComponent } from './task-template-selection/task-template-selection.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';


@NgModule({
  declarations: [
    TaskTemplateListItemComponent,
    TaskTemplateListComponent,
    TaskTemplateDetailsComponent,
    TaskTemplateSelectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TippyModule,
    AngularMyDatePickerModule,
    PipesModule,
    AutocompleteModule
  ],
  exports: [
    TaskTemplateListComponent,
    TaskTemplateSelectionComponent
  ]
})
export class TaskTemplateModule { }
