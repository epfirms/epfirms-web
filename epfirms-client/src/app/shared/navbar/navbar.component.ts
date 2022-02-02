import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CurrentUserService } from '../_services/current-user-service/current-user.service';

@Component({
  selector: '[tw-nav]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    'class': 'flex flex-col w-20  fixed inset-y-0 transition-all ease-in-out lg:w-64 z-10'
  },
  animations: [
    trigger("toggleAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.95)" }),
        animate("100ms ease-out", style({ opacity: 1, transform: "scale(1)" }))
      ]),
      transition(":leave", [
        animate("75ms", style({ opacity: 0, transform: "scale(0.95)" }))
      ])
    ])
  ]
})
export class NavbarComponent {
  currentUser$: Observable<any>;

  constructor(private _currentUserService: CurrentUserService, private _authService: AuthService) {
    this.currentUser$ = _currentUserService.getCurrentUser();
  }

  goToPortalSelect() {
    this._authService.selectPortal();
  }

  logout() {
    this._authService.logout();
  }
}
