import { Component, OnInit } from '@angular/core';
import { StripeService } from '@app/shared/_services/stripe-service/stripe.service';

@Component({
  selector: 'app-billing-page',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss'],
})
export class BillingPageComponent implements OnInit {
  //state of stripe connection
  isStripeConnected: boolean = false;

  constructor(private _stripeService: StripeService) {}

  ngOnInit(): void {
    this._stripeService.getConnectionStatus().subscribe((res) => {
      this.isStripeConnected = res.isConnected;
      console.log('isStripeConnected', this.isStripeConnected);
    });
  }

  integrateStripe(): void {
    this._stripeService.integrate().subscribe((res) => {
      console.log('stripe integration res', res);
      window.location = res.url;
    });
  }
}
