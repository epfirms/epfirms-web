import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const epModalAnimations: {
  readonly modalContainer: AnimationTriggerMetadata;
} = {
  modalContainer: trigger('modalContainer', [
    state('void, exit', style({})),
    state('enter', style({})),
    transition('* => enter', animate('.3s', style({}))),
    transition('* => void, * => exit', animate('.2s', style({})))
  ])
};

export const epSlideOverAnimations: {
  readonly modalContainer: AnimationTriggerMetadata;
} = {
  modalContainer: trigger('modalContainer', [
    state('void, exit', style({})),
    state('enter', style({})),
    transition('* => enter', animate('.7s', style({}))),
    transition('* => void, * => exit', animate('.7s', style({})))
  ])
};