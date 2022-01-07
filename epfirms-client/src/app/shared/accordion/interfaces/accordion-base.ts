import { CdkAccordion } from '@angular/cdk/accordion';
import { InjectionToken } from '@angular/core';

export type AccordionTogglePosition = 'before' | 'after';

export interface AccordionBase extends CdkAccordion {
  hideToggle: boolean;

  togglePosition: AccordionTogglePosition;

  _handleHeaderKeydown: (event: KeyboardEvent) => void;

  _handleHeaderFocus: (header: any) => void;
}

export const ACCORDION = new InjectionToken<AccordionBase>('ACCORDION');
