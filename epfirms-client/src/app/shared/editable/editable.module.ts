import { NgModule } from '@angular/core';
import { EditableDatepickerComponent } from './editable-datepicker/editable-datepicker.component';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CoreModule } from '@app/core/core.module';
import { TippyModule } from '@ngneat/helipopper';
import { EditableComponent } from './editable/editable.component';
import { EditableViewDirective } from './directives/editable-view.directive';
import { EditableEditDirective } from './directives/editable-edit.directive';
import { EditableFocusDirective } from './directives/editable-focus.directive';

@NgModule({
  declarations: [
    EditableInputComponent,
    EditableDatepickerComponent,
    EditableComponent,
    EditableViewDirective,
    EditableEditDirective,
    EditableFocusDirective,
  ],
  imports: [
    CoreModule,
    AngularMyDatePickerModule,
    TippyModule
  ],
  exports: [
    EditableInputComponent,
    EditableDatepickerComponent,
    EditableComponent,
    EditableFocusDirective,
    EditableViewDirective,
    EditableEditDirective
  ]
})
export class EditableModule { }
