import { NgModule } from '@angular/core';
import { InputGroupComponent } from './input-group/input-group.component';
import { InputDirective } from './directives/input.directive';
import { CoreModule } from '@app/core/core.module';
import { EditableInputDirective } from './directives/editable-input.directive';



@NgModule({
  declarations: [
    InputGroupComponent,
    InputDirective,
    EditableInputDirective
  ],
  imports: [
    CoreModule
  ],
  exports: [
    InputGroupComponent,
    InputDirective,
    EditableInputDirective
  ]
})
export class InputModule { }
