import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  ResolveEnd,
  ResolveStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition(':leave', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent {
  loading: boolean = true;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _titleService: Title,
  ) {
    const appTitle = this._titleService.getTitle();

    this._router.events.pipe(
      tap((event: RouterEvent) => {
        this.toggleLoadingScreen(event);
      }),
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this._activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data.title) {
          return child.snapshot.data.title;
        }
        return appTitle;
      }),
    ).subscribe((title: string) => {
      this._titleService.setTitle(title);
    });
  }

  toggleLoadingScreen(event: RouterEvent) {
    if (event instanceof ResolveStart) {
      this.loading = true;
    }

    if (event instanceof ResolveEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
