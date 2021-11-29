import { NgModule } from '@angular/core';
import { EditableAutocompleteComponent } from './editable-autocomplete/editable-autocomplete.component';
import { EditableDatepickerComponent } from './editable-datepicker/editable-datepicker.component';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { CoreModule } from '@app/core/core.module';
import { TippyModule } from '@ngneat/helipopper';

@NgModule({
  declarations: [
    EditableInputComponent,
    EditableAutocompleteComponent,
    EditableDatepickerComponent,
  ],
  imports: [
    CoreModule,
    AngularMyDatePickerModule,
    TippyModule
  ],
  exports: [
    EditableInputComponent,
    EditableAutocompleteComponent,
    EditableDatepickerComponent,
  ]
})
export class EditableModule { }
