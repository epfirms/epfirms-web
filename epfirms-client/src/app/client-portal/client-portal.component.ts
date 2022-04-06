import { Component, OnInit } from '@angular/core';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-client-portal',
  templateUrl: './client-portal.component.html',
  styleUrls: ['./client-portal.component.scss'],
  host: {
    class: 'inset-0 flex flex-col absolute overflow-hidden',
  },
})
export class ClientPortalComponent implements OnInit {

  //property to decide on whether or not we should show the financials tab
  // this should only display if the firm has integrated with Stripe
  displayFinancials : boolean = false;


  // display menu
  showMenu : boolean = false;

  constructor(
    private stripeService : StripeService
  ) {}

  ngOnInit() : void {
    this.stripeService.getConnectionStatus().subscribe(res => this.displayFinancials = res.isConnected);
  }

  toggleShowMenu() : void {
    this.showMenu = !this.showMenu;
  }
}
