import { NgModule } from '@angular/core';
import { CaseTemplateListItemComponent } from './case-template-list-item/case-template-list-item.component';
import { TippyModule } from '@ngneat/helipopper';
import { CaseTemplateSelectionComponent } from './case-template-selection/case-template-selection.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { EditableModule } from '@app/shared/editable/editable.module';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { InputModule } from '@app/shared/input/input.module';
import { AccordionModule } from '@app/shared/accordion/accordion.module';
import { CaseTemplateTaskListComponent } from './case-template-task-list/case-template-task-list.component';
import { OptionModule } from '@app/shared/option/option.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TaskModule } from '../task/task.module';


@NgModule({
  declarations: [
    CaseTemplateListItemComponent,
    CaseTemplateSelectionComponent,
    CaseTemplateTaskListComponent
  ],
  imports: [
    CoreModule,
    TippyModule,
    AngularMyDatePickerModule,
    PipesModule,
    AutocompleteModule,
    InputMaskModule,
    EditableModule,
    AvatarModule,
    InputModule,
    AccordionModule,
    OptionModule,
    NgScrollbarModule,
    TaskModule
  ],
  exports: [
    CaseTemplateSelectionComponent,
    CaseTemplateTaskListComponent,
    CaseTemplateListItemComponent
  ]
})
export class CaseTemplateModule { }
