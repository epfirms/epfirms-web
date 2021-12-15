import { InjectionToken } from "@angular/core";

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 * @docs-private
 */
export interface OptionParentComponent {
  multiple?: boolean;
  inertGroups?: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
 export const OPTION_PARENT_COMPONENT = new InjectionToken<OptionParentComponent>(
    'OPTION_PARENT_COMPONENT',
  );