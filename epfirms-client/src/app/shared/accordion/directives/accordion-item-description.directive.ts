import { Directive } from '@angular/core';

@Directive({
  selector: 'ep-accordion-item-description',
  host: {
    class: 'ep-accordion-item-header-description text-sm ml-2 text-slate-500',
  },
})
export class AccordionItemDescriptionDirective {}
