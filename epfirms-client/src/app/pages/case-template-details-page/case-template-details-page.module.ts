import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { EditableModule } from '@app/shared/editable/editable.module';
import { InputModule } from '@app/shared/input/input.module';
import { TaskModule } from '@app/features/task/task.module';
import { CaseTemplateDetailsPageRoutingModule } from './case-template-details-page-routing.module';
import { CaseTemplateDetailsPageComponent } from './case-template-details-page/case-template-details-page.component';
import { AvatarModule } from '@app/shared/avatar/avatar.module';
import { AutocompleteModule } from '@app/shared/autocomplete/autocomplete.module';
import { ButtonModule } from '@app/shared/button/button.module';
import { CaseTemplateModule } from '@app/features/case-template/case-template.module';



@NgModule({
  declarations: [
    CaseTemplateDetailsPageComponent
  ],
  imports: [
    CoreModule,
    CaseTemplateDetailsPageRoutingModule,
    CaseTemplateModule,
    InputModule,
    EditableModule,
    TaskModule,
    AvatarModule,
    AutocompleteModule,
    ButtonModule
  ]
})
export class CaseTemplateDetailsPageModule { }
