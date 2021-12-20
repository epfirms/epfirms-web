import {ActiveDescendantKeyManager} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty, coerceStringArray} from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
  Directive,
} from '@angular/core';

import {Subscription} from 'rxjs';
import { OPTGROUP, _OptgroupBase } from '../option/directives/option-group.directive';
import { _OptionBase } from '../option/directives/option.directive';
import { OPTION_PARENT_COMPONENT } from '../option/interfaces/option-parent';
import { Optgroup } from '../option/option-group/option-group.component';
import { OptionComponent } from '../option/option/option.component';

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

/** Event object that is emitted when an autocomplete option is selected. */
export class AutocompleteSelectedEvent {
  constructor(
    /** Reference to the autocomplete panel that emitted the event. */
    public source: _AutocompleteBase,
    /** Option that was selected. */
    public option: _OptionBase,
  ) {}
}

/** Event object that is emitted when an autocomplete option is activated. */
export interface AutocompleteActivatedEvent {
  /** Reference to the autocomplete panel that emitted the event. */
  source: _AutocompleteBase;

  /** Option that was selected. */
  option: _OptionBase | null;
}
/** @docs-private */
const _AutocompleteMixinBase = class {};

/** Default `ep-autocomplete` options that can be overridden. */
export interface AutocompleteDefaultOptions {
  /** Whether the first option should be highlighted when an autocomplete panel is opened. */
  autoActiveFirstOption?: boolean;

  /** Class or list of classes to be applied to the autocomplete's overlay panel. */
  overlayPanelClass?: string | string[];
}

/** @docs-private */
export function AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY(): AutocompleteDefaultOptions {
  return {autoActiveFirstOption: false};
}

/** Injection token to be used to override the default options for `ep-autocomplete`. */
export const AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken<AutocompleteDefaultOptions>(
  'ep-autocomplete-default-options',
  {
    providedIn: 'root',
    factory: AUTOCOMPLETE_DEFAULT_OPTIONS_FACTORY,
  },
);

/** Base class with all of the `AutocompleteComponent` functionality. */
@Directive()
export abstract class _AutocompleteBase
  extends _AutocompleteMixinBase
  implements AfterContentInit, OnDestroy
{
  private _activeOptionChanges = Subscription.EMPTY;

  /** Class to apply to the panel when it's visible. */
  protected abstract _visibleClass: string;

  /** Class to apply to the panel when it's hidden. */
  protected abstract _hiddenClass: string;

  /** Manages active item in option list based on key events. */
  _keyManager: ActiveDescendantKeyManager<_OptionBase>;

  /** Whether the autocomplete panel should be visible, depending on option length. */
  showPanel: boolean = false;

  /** Whether the autocomplete panel is open. */
  get isOpen(): boolean {
    return this._isOpen && this.showPanel;
  }

  _isOpen: boolean = false;

  // The @ViewChild query for TemplateRef here needs to be static because some code paths
  // lead to the overlay being created before change detection has finished for this component.
  // Notably, another component may trigger `focus` on the autocomplete-trigger.

  /** @docs-private */
  @ViewChild(TemplateRef, {static: true}) template: TemplateRef<any>;

  /** Element for the panel containing the autocomplete options. */
  @ViewChild('panel') panel: ElementRef;

  /** Reference to all options within the autocomplete. */
  abstract options: QueryList<_OptionBase>;

  /** Reference to all option groups within the autocomplete. */
  abstract optionGroups: QueryList<_OptgroupBase>;
  
  /** Aria label of the autocomplete. */
  @Input('aria-label') ariaLabel: string;

  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Function that maps an option's control value to its display value in the trigger. */
  @Input() displayWith: ((value: any, options: QueryList<_OptionBase>) => string) | null = null;

  /**
   * Whether the first option should be highlighted when the autocomplete panel is opened.
   * Can be configured globally through the `AUTOCOMPLETE_DEFAULT_OPTIONS` token.
   */
  @Input()
  get autoActiveFirstOption(): boolean {
    return this._autoActiveFirstOption;
  }

  set autoActiveFirstOption(value: boolean) {
    this._autoActiveFirstOption = coerceBooleanProperty(value);
  }

  private _autoActiveFirstOption: boolean;

  /**
   * Specify the width of the autocomplete panel.  Can be any CSS sizing value, otherwise it will
   * match the width of its host.
   */
  @Input() panelWidth: string | number;

  /** Event that is emitted whenever an option from the list is selected. */
  @Output() readonly optionSelected: EventEmitter<AutocompleteSelectedEvent> =
    new EventEmitter<AutocompleteSelectedEvent>();

  /** Event that is emitted when the autocomplete panel is opened. */
  @Output() readonly opened: EventEmitter<void> = new EventEmitter<void>();

  /** Event that is emitted when the autocomplete panel is closed. */
  @Output() readonly closed: EventEmitter<void> = new EventEmitter<void>();

  /** Emits whenever an option is activated using the keyboard. */
  @Output() readonly optionActivated: EventEmitter<AutocompleteActivatedEvent> =
    new EventEmitter<AutocompleteActivatedEvent>();

  /**
   * Takes classes set on the host ep-autocomplete element and applies them to the panel
   * inside the overlay container to allow for easy styling.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('class')
  set classList(value: string | string[]) {
    if (value && value.length) {
      this._classList = coerceStringArray(value).reduce((classList, className) => {
        classList[className] = true;
        return classList;
      }, {} as {[key: string]: boolean});
    } else {
      this._classList = {};
    }

    this._setVisibilityClasses(this._classList);
    this._elementRef.nativeElement.className = '';
  }

  _classList: {[key: string]: boolean} = {};

  /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
  id: string = `ep-autocomplete-${_uniqueAutocompleteIdCounter++}`;
  
  /**
   * Tells any descendant `optgroup` to use the inert a11y pattern.
   * @docs-private
   */
   readonly inertGroups: boolean;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(AUTOCOMPLETE_DEFAULT_OPTIONS) defaults: AutocompleteDefaultOptions
  ) {
    super();
    this.inertGroups = false;

    this._autoActiveFirstOption = !!defaults.autoActiveFirstOption;
  }

  ngAfterContentInit() {
    this._keyManager = new ActiveDescendantKeyManager<_OptionBase>(this.options).withWrap();
    this._activeOptionChanges = this._keyManager.change.subscribe(index => {
      if (this.isOpen) {
        this.optionActivated.emit({source: this, option: this.options.toArray()[index] || null});
      }
    });

    // Set the initial visibility state.
    this._setVisibility();
  }

  ngOnDestroy() {
    this._activeOptionChanges.unsubscribe();
  }

  /**
   * Sets the panel scrollTop. This allows us to manually scroll to display options
   * above or below the fold, as they are not actually being focused when active.
   */
  _setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  /** Returns the panel's scrollTop. */
  _getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  /** Panel should hide itself when the option list is empty. */
  _setVisibility() {
    this.showPanel = !!this.options.length;
    this._setVisibilityClasses(this._classList);
    this._changeDetectorRef.markForCheck();
  }

  /** Emits the `select` event. */
  _emitSelectEvent(option: _OptionBase): void {
    const event = new AutocompleteSelectedEvent(this, option);
    this.optionSelected.emit(event);
  }

  /** Gets the aria-labelledby for the autocomplete panel. */
  _getPanelAriaLabelledby(labelId: string | null): string | null {
    if (this.ariaLabel) {
      return null;
    }

    const labelExpression = labelId ? labelId + ' ' : '';
    return this.ariaLabelledby ? labelExpression + this.ariaLabelledby : labelId;
  }

  /** Sets the autocomplete visibility classes on a classlist based on the panel is visible. */
  private _setVisibilityClasses(classList: {[key: string]: boolean}) {
    classList[this._visibleClass] = this.showPanel;
    classList[this._hiddenClass] = !this.showPanel;
  }

  static ngAcceptInputType_autoActiveFirstOption: BooleanInput;
}

@Component({
  selector: 'ep-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'epAutocomplete',
  host: {
    'class': 'ep-autocomplete',
  },
  providers: [{provide: OPTION_PARENT_COMPONENT, useExisting: AutocompleteComponent}],
})
export class AutocompleteComponent extends _AutocompleteBase {
    /** Reference to all option groups within the autocomplete. */
    @ContentChildren(OPTGROUP, {descendants: true}) optionGroups: QueryList<Optgroup>;

  /** Reference to all options within the autocomplete. */
  @ContentChildren(OptionComponent, {descendants: true}) options: QueryList<OptionComponent>;

  protected _visibleClass = 'ep-autocomplete-visible';

  protected _hiddenClass = 'ep-autocomplete-hidden';
}