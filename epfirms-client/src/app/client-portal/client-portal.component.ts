import { Component, OnInit } from '@angular/core';
import { AuthActions } from '@app/features/auth/auth.actions';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-client-portal',
  templateUrl: './client-portal.component.html',
  styleUrls: ['./client-portal.component.scss'],
  host: {
    class: 'inset-0 flex flex-col absolute ',
  },
})
export class ClientPortalComponent implements OnInit {

  //property to decide on whether or not we should show the financials tab
  // this should only display if the firm has integrated with Stripe
  displayFinancials : boolean = false;


  // display menu
  showMenu : boolean = false;

  constructor(
    private stripeService : StripeService,
    private store: Store
  ) {}

  ngOnInit() : void {
    this.stripeService.getConnectionStatus().subscribe(res => this.displayFinancials = res.isConnected);
  }

  toggleShowMenu() : void {
    this.showMenu = !this.showMenu;
  }

  logout() : void {
    this.store.dispatch(AuthActions.signOut());
  }   
}
