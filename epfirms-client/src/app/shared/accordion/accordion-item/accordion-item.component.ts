import { CdkAccordionItem } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Inject, InjectionToken, Input, OnChanges, OnDestroy, Optional, Output, SimpleChanges, SkipSelf, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { distinctUntilChanged, filter, startWith, Subject, take } from 'rxjs';
import { expansionAnimations } from '../accordion-animations';
import { AccordionItemContentDirective } from '../directives/accordion-item-content.directive';
import { ACCORDION, AccordionBase, AccordionTogglePosition } from '../interfaces/accordion-base';
import { AccordionItemDefaultOptions } from '../interfaces/accordion-item-default-options';
import {AnimationEvent} from '@angular/animations';

export type AccordionItemExpansionState = 'expanded' | 'collapsed';

let uniqueId = 0;

export const ACCORDION_ITEM_DEFAULT_OPTIONS = new InjectionToken<AccordionItemDefaultOptions>('ACCORDION_ITEM_DEFAULT_OPTIONS');

@Component({
  selector: 'ep-accordion-item',
  exportAs: 'epAccordionItem',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expanded'],
  // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
  outputs: ['opened', 'closed', 'expandedChange'],
  animations: [expansionAnimations.bodyExpansion],
  providers: [
    {provide: ACCORDION, useValue: undefined}
  ],
  host: {
    'class': 'ep-accordion-item block py-2',
    '[class.ep-expanded]': 'expanded',
  }
})
export class AccordionItemComponent extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {

  private _document: Document;

  private _hideToggle = false;

  private _togglePosition: AccordionTogglePosition;

  @Input()
  get hideToggle(): boolean {
    return this._hideToggle || (this.accordion && this.accordion.hideToggle);
  }

  set hideToggle(value: BooleanInput) {
    this._hideToggle = coerceBooleanProperty(value);
  }

  @Input()
  get togglePosition(): AccordionTogglePosition {
    return this.accordion ? this.accordion.togglePosition : this._togglePosition;
  }

  set togglePosition(value: AccordionTogglePosition) {
    this._togglePosition = value;
  }

  @Output() readonly afterExpand = new EventEmitter<void>();

  @Output() readonly afterCollapse = new EventEmitter<void>();

  readonly _inputChanges = new Subject<SimpleChanges>();

  override accordion: AccordionBase;

  @ContentChild(AccordionItemContentDirective) _lazyContent: AccordionItemContentDirective;

  @ViewChild('body') _body: ElementRef<HTMLElement>;

  _portal: TemplatePortal;

  _headerId = `ep-expansion-panel-header-${uniqueId++}`;

  /** Stream of body animation done events. */
  readonly _bodyAnimationDone = new Subject<AnimationEvent>();

  constructor(
    @Optional() @SkipSelf() @Inject(ACCORDION) accordion: AccordionBase,
    _changeDetectorRef: ChangeDetectorRef,
    _uniqueSelectionDispatcher: UniqueSelectionDispatcher,
    private _viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) _document: any,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) public _animationMode: string,
    @Inject(ACCORDION_ITEM_DEFAULT_OPTIONS)
    @Optional()
    defaultOptions?: AccordionItemDefaultOptions,
  ) {
    super(accordion, _changeDetectorRef, _uniqueSelectionDispatcher);
    this.accordion = accordion;
    this._document = _document;

    // We need a Subject with distinctUntilChanged, because the `done` event
    // fires twice on some browsers. See https://github.com/angular/angular/issues/24084
    this._bodyAnimationDone
      .pipe(
        distinctUntilChanged((x, y) => {
          return x.fromState === y.fromState && x.toState === y.toState;
        }),
      )
      .subscribe(event => {
        if (event.fromState !== 'void') {
          if (event.toState === 'expanded') {
            this.afterExpand.emit();
          } else if (event.toState === 'collapsed') {
            this.afterCollapse.emit();
          }
        }
      });

    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }

  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing(): boolean {
    return false;
  }

  /** Gets the expanded state string. */
  _getExpandedState(): AccordionItemExpansionState {
    return this.expanded ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state of the expansion panel. */
  override toggle(): void {
    this.expanded = !this.expanded;
  }

  /** Sets the expanded state of the expansion panel to false. */
  override close(): void {
    this.expanded = false;
  }

  /** Sets the expanded state of the expansion panel to true. */
  override open(): void {
    this.expanded = true;
  }

  ngAfterContentInit() {
    if (this._lazyContent) {
      // Render the content as soon as the panel becomes open.
      this.opened
        .pipe(
          startWith(null),
          filter(() => this.expanded && !this._portal),
          take(1),
        )
        .subscribe(() => {
          this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
        });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._inputChanges.next(changes);
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this._bodyAnimationDone.complete();
    this._inputChanges.complete();
  }

  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus(): boolean {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }

    return false;
  }
}