import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[epEditableView]'
})
export class EditableViewDirective {

  constructor(public readonly templateRef: TemplateRef<any>) { }

}
