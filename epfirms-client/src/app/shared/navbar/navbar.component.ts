import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { User as FirebaseUser } from '@angular/fire/auth';
import { AuthService } from '@app/features/auth/auth.service';
import { Observable } from 'rxjs';

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
  user$: Observable<FirebaseUser>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  goToPortalSelect() {
    // this._authService.selectPortal();
  }

  logout() {
    // this._authService.logout();
  }
}
