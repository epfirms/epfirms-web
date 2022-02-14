import { animate, style, transition, trigger } from '@angular/animations';

export const chatWindowAnimation = trigger('chatWindowAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(0.25rem)', opacity: 0 }),
    animate('200ms ease-out', style({ transform: 'translateY(0px)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0px)', opacity: 1 }),
    animate('150ms ease-in', style({ transform: 'translateY(0.25rem)', opacity: 0 })),
  ]),
]);
