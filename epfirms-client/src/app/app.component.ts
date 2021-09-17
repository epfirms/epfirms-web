import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationError,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
      )
    ])
  ],
})
export class AppComponent {
  loading: boolean = true;

  constructor(private _router: Router) {
    _router.events.subscribe((routerEvent: RouterEvent) => {
      this.handleRouterEvent(routerEvent);
    });
  }

  handleRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof ResolveStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof ResolveEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
}
