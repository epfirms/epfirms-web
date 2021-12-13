import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '@app/shared/_services/current-user-service/current-user.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss'],
  host: {
    'class': 'flex-1 relative z-0 flex flex-col overflow-hidden'
  }
})
export class ClientHomeComponent implements OnInit, OnDestroy {
  greeting: string;

  currentUserSubscription: Subscription
  currentUser$: Observable<any>;
  currentUser: any;

  constructor(private _currentUserService: CurrentUserService) {
    this.currentUser$ = this._currentUserService.getCurrentUser();
  }

  ngOnInit(): void {
    this.greeting = this.getGreeting(new Date());

    this.currentUserSubscription = this.currentUser$.subscribe(({user}) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  getGreeting(today: Date): string {
    const hours = today.getHours();

    if (hours < 12) {
      return "morning";
    } else if(hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }
}
