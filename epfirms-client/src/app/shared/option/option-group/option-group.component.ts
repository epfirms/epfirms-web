/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OPTGROUP, _OptgroupBase } from '../directives/option-group.directive';

@Component({
  selector: 'ep-option-group',
  templateUrl: './option-group.component.html',
  styleUrls: ['./option-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['disabled'],
  host: {
    'class': 'block pb-2',
    '[attr.role]': '_inert ? null : "group"',
    '[attr.aria-disabled]': '_inert ? null : disabled.toString()',
    '[attr.aria-labelledby]': '_inert ? null : _labelId',
    '[class.mat-optgroup-disabled]': 'disabled',
  },
  providers: [{provide: OPTGROUP, useExisting: Optgroup}],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Optgroup extends _OptgroupBase {}
