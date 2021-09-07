import { Directive } from '@angular/core';

@Directive({
  selector: '[tab]',
  exportAs: 'tab'
})
export class TabDirective {

  constructor() { }

}