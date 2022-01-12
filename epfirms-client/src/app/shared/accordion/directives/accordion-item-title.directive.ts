import { Directive } from '@angular/core';

@Directive({
  selector: 'ep-accordion-item-title',
  host: {
    class: 'ep-accordion-item-header-title text-base font-medium',
  },})
export class AccordionItemTitleDirective {}
