import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { mixinColor } from '../common-behaviors/color';
import { mixinDisabled } from '../common-behaviors/disabled';
import { mixinSize } from '../common-behaviors/size';

const BUTTON_HOST_ATTRIBUTES = [
  'ep-button',
  'ep-icon-button',
  'ep-round-button',
  'ep-circular-button'
];

const _EpButtonBase = mixinColor(
  mixinSize(
    mixinDisabled(
      class {
        constructor(public _elementRef: ElementRef) {}
      }
    ),
    'sm'
  ),
  'primary'
);

@Component({
  selector:
    'button[ep-button], button[ep-icon-button], button[ep-round-button], button[ep-circular-button]',
  exportAs: 'epButton',
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.ep-button-disabled]': 'disabled'
  },
  inputs: ['disabled', 'color', 'size'],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends _EpButtonBase {
  readonly isCircularButton: boolean = this._hasHostAttributes('ep-circular-button');

  readonly isIconButton: boolean = this._hasHostAttributes('ep-icon-button');

  constructor(elementRef: ElementRef) {
    super(elementRef);

    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        (this._getHostElement() as HTMLElement).classList.add(attr);
      }
    }

    elementRef.nativeElement.classList.add('ep-button-base');
  }

  private _getHostElement() {
    return this._elementRef.nativeElement;
  }

  /** Gets whether the button has one of the given attributes. */
  private _hasHostAttributes(...attributes: string[]): boolean {
    return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
  }
}
