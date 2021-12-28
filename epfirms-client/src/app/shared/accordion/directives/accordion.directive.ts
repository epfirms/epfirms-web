import { FocusKeyManager } from '@angular/cdk/a11y';
import { CdkAccordion } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { startWith } from 'rxjs';
import { AccordionItemHeaderComponent } from '../accordion-item-header/accordion-item-header.component';
import { ACCORDION, AccordionBase, AccordionTogglePosition } from '../interfaces/accordion-base';

@Directive({
  selector: 'ep-accordion',
  exportAs: 'epAccordion',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['multi'],
  providers: [
    {
      provide: ACCORDION,
      useExisting: AccordionDirective,
    },
  ],
  host: {
    class: 'ep-accordion',
  },
})
export class AccordionDirective
  extends CdkAccordion
  implements AccordionBase, AfterContentInit, OnDestroy
{
  private _keyManager: FocusKeyManager<AccordionItemHeaderComponent>;

  /** Headers from the parent accordion. */
  private _ownHeaders = new QueryList<AccordionItemHeaderComponent>();

  /** Headers from the parent and any nested accordions. */
  @ContentChildren(AccordionItemHeaderComponent, { descendants: true })
  _headers: QueryList<AccordionItemHeaderComponent>;

  /** Hidden state of the expansion indicator. */
  @Input() get hideToggle(): boolean {
    return this._hideToggle;
  }

  set hideToggle(show: BooleanInput) {
    this._hideToggle = coerceBooleanProperty(show);
  }

  private _hideToggle: boolean = false;

  /** The position of the expansion indicator. */
  @Input() togglePosition: AccordionTogglePosition = 'after';

  ngAfterContentInit(): void {
    this._headers.changes
      .pipe(startWith(this._headers))
      .subscribe((headers: QueryList<AccordionItemHeaderComponent>) => {
        this._ownHeaders.reset(headers.filter((header) => header.panel.accordion === this));
        this._ownHeaders.notifyOnChanges();
      });

    this._keyManager = new FocusKeyManager(this._ownHeaders).withWrap().withHomeAndEnd();
  }

  _handleHeaderKeydown(event: KeyboardEvent) {
    this._keyManager.onKeydown(event);
  }

  _handleHeaderFocus(header: AccordionItemHeaderComponent) {
    this._keyManager.updateActiveItem(header);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._ownHeaders.destroy();
  }
}
