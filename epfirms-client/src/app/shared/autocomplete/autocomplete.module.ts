import { NgModule } from '@angular/core';
import { NgxSelectModule } from 'ngx-select-ex';
import { AutocompleteComponent } from './autocomplete.component';
import { CoreModule } from '@app/core/core.module';
import { LegacyAutocompleteComponent } from './legacy-autocomplete/legacy-autocomplete.component';



@NgModule({
  declarations: [
    AutocompleteComponent,
    LegacyAutocompleteComponent
  ],
  imports: [
    CoreModule,
    NgxSelectModule
  ],
  exports: [
    AutocompleteComponent,
    LegacyAutocompleteComponent
  ]
})
export class AutocompleteModule { }
