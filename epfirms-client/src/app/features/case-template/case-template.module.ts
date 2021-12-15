import { NgModule } from '@angular/core';
import { CaseTemplateListComponent } from './case-template-list/case-template-list.component';
import { CaseTemplateListItemComponent } from './case-template-list-item/case-template-list-item.component';
import { TippyModule } from '@ngneat/helipopper';
import { CaseTemplateDetailsComponent } from './case-template-details/case-template-details.component';
import { CaseTemplateSelectionComponent } from './case-template-selection/case-template-selection.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { PipesModule } from '@app/core/pipes/pipes.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { TaskFileModule } from '../task-file/task-file.module';
import { InputMaskModule } from '@ngneat/input-mask';
import { EditableModule } from '@app/shared/editable/editable.module';
import { CoreModule } from '@app/core/core.module';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { InputModule } from '@app/shared/input/input.module';
import { CaseTemplateCommunityComponent } from './case-template-community/case-template-community.component';


@NgModule({
  declarations: [
    CaseTemplateListItemComponent,
    CaseTemplateListComponent,
    CaseTemplateDetailsComponent,
    CaseTemplateSelectionComponent,
    CaseTemplateCommunityComponent
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
    CaseTemplateListComponent,
    CaseTemplateSelectionComponent
  ]
})
export class CaseTemplateModule { }
