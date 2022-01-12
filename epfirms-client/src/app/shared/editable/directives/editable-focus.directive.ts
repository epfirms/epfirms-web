import { AfterContentInit, AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[epEditableFocus]'
})
export class EditableFocusDirective implements AfterContentInit {
  constructor(private readonly _element: ElementRef) { }

  ngAfterContentInit(): void {
    this._element.nativeElement.focus();
  }
  
  public get nativeElement(): any {
    return this._element.nativeElement;
  }
}
