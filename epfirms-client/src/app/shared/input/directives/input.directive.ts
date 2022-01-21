import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  Self,
  SimpleChanges
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'input[ep-input],textarea[ep-input]',
  exportAs: 'epInput',
  host: {
    '[class.ep-input]': '!editable',
    '[class.ep-input-editable]': 'editable',
    '[class.ep-input-disabled]': 'disabled'
  }
})
export class InputDirective implements OnChanges, OnInit, OnDestroy {
  @HostListener('blur') trimOnBlur() {
    const trimmedValue = this.elementRef.nativeElement.value.trim();
    this.elementRef.nativeElement.value = trimmedValue;
    if (this.ngControl) {
      this.ngControl.control.setValue(trimmedValue);
    }
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

  @Input('epEditable')
  get editable(): boolean {
    return this._editable;
  }

  set editable(value: boolean) {
    this._editable = coerceBooleanProperty(value);
  }

  private _disabled = false;

  private _editable = false;

  disabled$ = new Subject<boolean>();

  editable$ = new Subject<boolean>();

  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
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
    const { disabled, editable } = changes;
    if (disabled) {
      this.disabled$.next(this.disabled);
    }
    if (editable) {
      this._subscribeToEditableChanges();
    } 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private _subscribeToEditableChanges(): void {
    const editableClassStyle = 'ep-input-editable';
    this.editable$.pipe(takeUntil(this.destroy$)).subscribe((editableValue) => {
      if (editableValue) {
        this.renderer.addClass(this.elementRef, editableClassStyle);
        this.renderer.removeClass(this.elementRef, 'ep-input');
      } else {
        this.renderer.addClass(this.elementRef, 'ep-input');
        this.renderer.removeClass(this.elementRef, editableClassStyle);
      }
    });
  }
}
