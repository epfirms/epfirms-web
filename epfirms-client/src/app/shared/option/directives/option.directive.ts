import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {ENTER, SPACE, hasModifierKey} from '@angular/cdk/keycodes';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Directive,
  QueryList,
} from '@angular/core';
import {FocusOptions, FocusableOption, FocusOrigin} from '@angular/cdk/a11y';
import {Subject} from 'rxjs';
import { OptionComponent } from '../option/option.component';
import { Optgroup } from '../option-group/option-group.component';
import { _OptgroupBase } from './option-group.directive';

/**
 * Option IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;

/** Event object emitted by MatOption when selected or deselected. */
export class OptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: _OptionBase,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false,
  ) {}
}

@Directive({
  selector: 'ep-option-base'
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class _OptionBase implements FocusableOption, AfterViewChecked, OnDestroy {
  private _selected = false;

  private _active = false;

  private _disabled = false;

  private _mostRecentViewValue = '';

  /** Whether or not the option is currently selected. */
  get selected(): boolean {
    return this._selected;
  }

  /** The form value of the option. */
  @Input() value: any;

  /** The value used in a displayWith function */
  @Input() displayValue: any;

  /** The unique ID of the option. */
  @Input() id: string = `ep-option-${_uniqueIdCounter++}`;

  /** Whether the option is disabled. */
  @Input()
  get disabled() {
    return (this.group && this.group.disabled) || this._disabled;
  }

  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  /** Event emitted when the option is selected or deselected. */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onSelectionChange = new EventEmitter<OptionSelectionChange>();

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    readonly group: _OptgroupBase,
  ) {}

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active(): boolean {
    return this._active;
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  get viewValue(): string {
    return (this._getHostElement().textContent || '').trim();
  }

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Sets focus onto this option. */
  focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
    // use `MatOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
    const element = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    if (!this._active) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  /** Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if ((event.keyCode === ENTER || event.keyCode === SPACE) && !hasModifierKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /**
   * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
   * attribute from single-selection, unselected options. Including the `aria-selected="false"`
   * attributes adds a significant amount of noise to screen-reader users without providing useful
   * information.
   */
  _getAriaSelected(): boolean | null {
    return this.selected || null;
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Gets the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  ngAfterViewChecked() {
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit(new OptionSelectionChange(this, isUserInput));
  }

  static ngAcceptInputType_disabled: BooleanInput;
}

/**
 * Counts the amount of option group labels that precede the specified option.
 * @param optionIndex Index of the option at which to start counting.
 * @param options Flat list of all of the options.
 * @param optionGroups Flat list of all of the option groups.
 * @docs-private
 */
 export function _countGroupLabelsBeforeOption(
  optionIndex: number,
  options: QueryList<OptionComponent>,
  optionGroups: QueryList<Optgroup>,
): number {
  if (optionGroups.length) {
    let optionsArray = options.toArray();
    let groups = optionGroups.toArray();
    let groupCounter = 0;

    for (let i = 0; i < optionIndex + 1; i++) {
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }

    return groupCounter;
  }

  return 0;
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function _getOptionScrollPosition(
  optionOffset: number,
  optionHeight: number,
  currentScrollPosition: number,
  panelHeight: number,
): number {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}