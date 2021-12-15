import { NgModule } from '@angular/core';
import { OptionComponent } from './option/option.component';
import { _OptionBase } from './directives/option.directive';
import { Optgroup } from './option-group/option-group.component';
import { CoreModule } from '@app/core/core.module';


@NgModule({
  declarations: [
    OptionComponent,
    Optgroup,
  ],
  imports: [
    CoreModule
  ],
  exports: [
    OptionComponent,
    Optgroup
  ]
})
export class OptionModule { }
