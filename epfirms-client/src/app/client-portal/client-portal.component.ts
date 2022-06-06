import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

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
    private authService : AuthService
  ) {}

  ngOnInit() : void {
    this.stripeService.getConnectionStatus().subscribe(res => this.displayFinancials = res.isConnected);
  }

  toggleShowMenu() : void {
    this.showMenu = !this.showMenu;
  }

  logout() : void {
    this.authService.logout();
  }   
}
