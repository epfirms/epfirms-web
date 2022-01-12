import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import { CoreModule } from '@app/core/core.module';
import { LegacyAutocompleteComponent } from './legacy-autocomplete/legacy-autocomplete.component';
import { AutocompleteTrigger, AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER } from './directives/autocomplete-trigger';
import { AutocompleteOrigin } from './directives/autocomplete-origin';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { OptionModule } from '../option/option.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AutocompleteComponent,
    LegacyAutocompleteComponent,
    AutocompleteTrigger,
    AutocompleteOrigin
  ],
  imports: [
    CoreModule,
    OverlayModule,
    OptionModule
  ],
  exports: [
    AutocompleteComponent,
    LegacyAutocompleteComponent,
    AutocompleteTrigger,
    AutocompleteOrigin,
    CdkScrollableModule,
    OptionModule
  ],
  providers: [AUTOCOMPLETE_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class AutocompleteModule { }
