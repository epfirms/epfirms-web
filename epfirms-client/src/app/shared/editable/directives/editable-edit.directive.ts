import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[epEditableEdit]'
})
export class EditableEditDirective {
  
  constructor(public readonly templateRef: TemplateRef<any>) { }
}
