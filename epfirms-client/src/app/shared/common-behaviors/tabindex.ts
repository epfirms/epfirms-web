import { coerceNumberProperty } from '@angular/cdk/coercion';
import { AbstractConstructor, Constructor } from './constructor';
import { CanDisable } from './disabled';

export interface HasTabIndex {
  tabIndex: number;

  defaultTabIndex: number;
}

type HasTabIndexCtor = Constructor<HasTabIndex> & AbstractConstructor<HasTabIndex>;

export function mixinTabIndex<T extends AbstractConstructor<CanDisable>>(
  base: T,
  defaultTabIndex?: number,
): HasTabIndexCtor & T;

export function mixinTabIndex<T extends Constructor<CanDisable>>(
  base: T,
  defaultTabIndex = 0,
): HasTabIndexCtor & T {
  return class extends base implements HasTabIndex {
    private _tabIndex: number = defaultTabIndex;

    defaultTabIndex = defaultTabIndex;

    get tabIndex(): number {
      return this.disabled ? -1 : this._tabIndex;
    }

    set tabIndex(value: number) {
      // If the specified tabIndex value is null or undefined, fall back to the default value.
      this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
    }

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(...args: any[]) {
      super(...args);
    }
  };
}
