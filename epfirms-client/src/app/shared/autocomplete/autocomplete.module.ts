import { NgModule } from '@angular/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { AutocompleteComponent } from './autocomplete.component';
import { CoreModule } from '@app/core/core.module';



@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CoreModule,
    NgxSelectModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
