import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, Optional, Inject } from "@angular/core";
import { OPTGROUP } from "../directives/option-group.directive";
import { _OptionBase } from "../directives/option.directive";
import { OptionParentComponent, OPTION_PARENT_COMPONENT } from "../interfaces/option-parent";
import { Optgroup } from "../option-group/option-group.component";

/**
 * Single option inside of a `<ep-select>` element.
 */
 @Component({
  selector: 'ep-option',
  exportAs: 'epOption',
  host: {
    'role': 'option',
    '[attr.tabindex]': '_getTabIndex()',
    '[class.ep-selected]': 'selected',
    '[class.ep-active]': 'active',
    '[id]': 'id',
    '[attr.aria-selected]': '_getAriaSelected()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.ep-option-disabled]': 'disabled',
    '(click)': '_selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
    'class': 'ep-option ep-focus-indicator',
  },
  styleUrls: ['option.component.scss'],
  templateUrl: 'option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent extends _OptionBase {
  constructor(
    element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(OPTION_PARENT_COMPONENT) parent: OptionParentComponent,
    @Optional() @Inject(OPTGROUP) group: Optgroup,
  ) {
    super(element, changeDetectorRef, group);
  }
}
