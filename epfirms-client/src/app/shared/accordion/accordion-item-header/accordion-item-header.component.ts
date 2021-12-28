/* eslint-disable @typescript-eslint/dot-notation */
import { FocusableOption, FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ENTER, hasModifierKey, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { HasTabIndex, mixinTabIndex } from '@app/shared/common-behaviors/tabindex';
import { EMPTY, filter, merge, Subscription } from 'rxjs';
import { expansionAnimations } from '../accordion-animations';
import { AccordionItemComponent, ACCORDION_ITEM_DEFAULT_OPTIONS } from '../accordion-item/accordion-item.component';
import { AccordionItemHeaderBase } from '../classes/accordion-item-header';
import { AccordionTogglePosition } from '../interfaces/accordion-base';
import { AccordionItemDefaultOptions } from '../interfaces/accordion-item-default-options';

const _AccordionItemHeaderMixinBase = mixinTabIndex(AccordionItemHeaderBase);

@Component({
  selector: 'ep-accordion-item-header',
  templateUrl: './accordion-item-header.component.html',
  styleUrls: ['./accordion-item-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['tabIndex'],
  animations: [expansionAnimations.indicatorRotate],
  host: {
    class: 'ep-accordion-item-header ep-focus-indicator flex select-none justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-900 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75',
    role: 'button',
    '[attr.tabindex]': 'tabIndex',
    '[attr.aria-controls]': '_getPanelId()',
    '[attr.aria-expanded]': '_isExpanded()',
    '[attr.aria-disabled]': 'panel.disabled',
    '[class.ep-expanded]': '_isExpanded()',
    '[class.ep-accordion-toggle-indicator-after]': `_getTogglePosition() === 'after'`,
    '[class.ep-accordion-toggle-indicator-before]': `_getTogglePosition() === 'before'`,
    '[style.height]': '_getHeaderHeight()',
    '(click)': '_toggle()',
    '(keydown)': '_keydown($event)',
  },
})
export class AccordionItemHeaderComponent
  extends _AccordionItemHeaderMixinBase
  implements AfterViewInit, OnDestroy, FocusableOption, HasTabIndex
{
  private _parentChangeSubscription = Subscription.EMPTY;

  @Input() expandedHeight: string;

  @Input() collapsedHeight: string;

  constructor(
    @Host() public panel: AccordionItemComponent,
    private _element: ElementRef,
    private _focusMonitor: FocusMonitor,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(ACCORDION_ITEM_DEFAULT_OPTIONS)
    @Optional()
    defaultOptions?: AccordionItemDefaultOptions,
    @Attribute('tabindex') tabIndex?: string,
  ) {
    super();
    const accordionHideToggleChange = panel.accordion
      ? panel.accordion._stateChanges.pipe(
          filter((changes) => !!(changes['hideToggle'] || changes['togglePosition'])),
        )
      : EMPTY;
    this.tabIndex = parseInt(tabIndex || '') || 0;

    this._parentChangeSubscription = merge(
      panel.opened,
      panel.closed,
      accordionHideToggleChange,
      panel._inputChanges.pipe(
        filter((changes) => {
          return !!(changes['hideToggle'] || changes['disabled'] || changes['togglePosition']);
        }),
      ),
    ).subscribe(() => this._changeDetectorRef.markForCheck());

    panel.closed
      .pipe(filter(() => panel._containsFocus()))
      .subscribe(() => _focusMonitor.focusVia(_element, 'program'));

    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._element).subscribe((origin) => {
      if (origin && this.panel.accordion) {
        this.panel.accordion._handleHeaderFocus(this);
      }
    });
  }

  ngOnDestroy(): void {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }

  get disabled(): boolean {
    return this.panel.disabled;
  }

  _toggle(): void {
    if (!this.disabled) {
      this.panel.toggle();
    }
  }

  _isExpanded(): boolean {
    return this.panel.expanded;
  }

  _getExpandedState(): string {
    return this.panel._getExpandedState();
  }

  _getPanelId(): string {
    return this.panel.id;
  }

  _getTogglePosition(): AccordionTogglePosition {
    return this.panel.togglePosition;
  }

  _showToggle(): boolean {
    return !this.panel.hideToggle && !this.panel.disabled;
  }

  _getHeaderHeight(): string | null {
    const isExpanded = this._isExpanded();
    if (isExpanded && this.expandedHeight) {
      return this.expandedHeight;
    } else if (!isExpanded && this.collapsedHeight) {
      return this.collapsedHeight;
    }

    return null;
  }

  _keydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }

        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }

        return;
    }
  }

  focus(origin?: FocusOrigin, options?: FocusOptions) {
    if (origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
}