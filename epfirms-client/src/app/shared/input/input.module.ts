import { NgModule } from '@angular/core';
import { InputGroupComponent } from './input-group/input-group.component';
import { InputDirective } from './directives/input.directive';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  declarations: [
    InputGroupComponent,
    InputDirective
  ],
  imports: [
    CoreModule
  ],
  exports: [
    InputGroupComponent,
    InputDirective
  ]
})
export class InputModule { }
