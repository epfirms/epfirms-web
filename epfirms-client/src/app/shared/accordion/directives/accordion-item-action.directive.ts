import { Directive } from '@angular/core';

@Directive({
  selector: '[ep-action-row]',
  host: {
    class: 'ep-action-row'
  }
})
export class AccordionItemActionDirective {}
