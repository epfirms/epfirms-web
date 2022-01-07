import { BooleanInput } from "@angular/cdk/coercion";
import { Directive, Inject, InjectionToken, Input, Optional } from "@angular/core";
import { CanDisable, mixinDisabled } from "@app/shared/common-behaviors/disabled";
import { OptionParentComponent, OPTION_PARENT_COMPONENT } from "../interfaces/option-parent";
import { Optgroup } from "../option-group/option-group.component";

const _OptgroupMixinBase = mixinDisabled(class {});

// Counter for unique group ids.
let _uniqueOptgroupIdCounter = 0;

@Directive()
export class _OptgroupBase extends _OptgroupMixinBase implements CanDisable {
  /** Label for the option group. */
  @Input() label: string;

  /** Unique id for the underlying label. */
  _labelId: string = `optgroup-label-${_uniqueOptgroupIdCounter++}`;

  /** Whether the group is in inert a11y mode. */
  _inert: boolean;

  constructor(@Inject(OPTION_PARENT_COMPONENT) @Optional() parent?: OptionParentComponent) {
    super();
    this._inert = false;
  }

  static ngAcceptInputType_disabled: BooleanInput;
}

/**
 * Injection token that can be used to reference instances of `MatOptgroup`. It serves as
 * alternative token to the actual `MatOptgroup` class which could cause unnecessary
 * retention of the class and its component metadata.
 */
export const OPTGROUP = new InjectionToken<Optgroup>('Optgroup');