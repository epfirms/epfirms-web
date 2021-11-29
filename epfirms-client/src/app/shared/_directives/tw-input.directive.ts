import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Optional, Renderer2, Self, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[tw-input]',
  host: {
    class: 'shadow-sm focus:ring-indigo-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
  }
})
export class TwInputDirective implements OnChanges, OnInit, OnDestroy {
  @Input() epSize = 'default';
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
  }
  _disabled = false;
  disabled$ = new Subject<boolean>();
  ngControlSubscription: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    renderer: Renderer2,
    elementRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    if (this.ngControl) {
      this.ngControlSubscription = this.ngControl.statusChanges
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
    if (this.ngControlSubscription) {
    this.ngControlSubscription.unsubscribe();
  }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
