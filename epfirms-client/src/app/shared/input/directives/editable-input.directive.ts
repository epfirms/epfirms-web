import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2, Self, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

@Directive({
  selector: 'input[ep-editable-input],textarea[ep-editable-input]',
  exportAs: 'epEditableInput',
  host: {
    '[class.ep-input-disabled]': 'disabled'
  }
})
export class EditableInputDirective implements OnChanges, OnInit, OnDestroy {
  @HostListener('blur') trimOnBlur() {
    const trimmedValue = this.elementRef.nativeElement.value.trim();
    this.elementRef.nativeElement.value = trimmedValue;
    if (this.ngControl) {
      this.ngControl.control.setValue(trimmedValue);
    }
  }

  @HostListener('input', ['$event.target']) resizeInput(event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', 2+event.value.length + 'ch');
  }
  
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }

    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  private _disabled = false;

  disabled$ = new Subject<boolean>();

  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    const initialWidth: number = this.elementRef.nativeElement.value.length || this.elementRef.nativeElement.placeholder.length || 10;
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', 2+initialWidth+'ch');
    this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', '100%');
    if (this.ngControl) {
      this.ngControl.statusChanges
        ?.pipe(
          filter(() => this.ngControl.disabled !== null),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.disabled$.next(this.ngControl.disabled!);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disabled } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
