import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[epAccordionItemContent]'
})
export class AccordionItemContentDirective {

  constructor(public _template: TemplateRef<any>) { }

}