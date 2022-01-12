import {Directive, ElementRef} from '@angular/core';

 /** Base class containing all of the functionality for `MatAutocompleteOrigin`. */
 @Directive()
 export abstract class _AutocompleteOriginBase {
   constructor(
     /** Reference to the element on which the directive is applied. */
     public elementRef: ElementRef<HTMLElement>,
   ) {}
 }
 
 /**
  * Directive applied to an element to make it usable
  * as a connection point for an autocomplete panel.
  */
 @Directive({
   selector: '[epAutocompleteOrigin]',
   exportAs: 'epAutocompleteOrigin',
 })
 // eslint-disable-next-line @angular-eslint/directive-class-suffix
 export class AutocompleteOrigin extends _AutocompleteOriginBase {}